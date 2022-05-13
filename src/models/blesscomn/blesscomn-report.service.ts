import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PageOptionDto, ResponseDto } from 'src/common/dto';
import { UserPayloadDto } from 'src/common/dto/user-payload.dto';
import { BlesscomnReportRepo } from './blesscomn-report.repository';
import {
  CreateReportDto,
  GetReportDto,
  QueryReportDto,
  UpdateReportDto,
} from './dto';
import { BlesscomnRepository } from './blesscomn.repository';
import { Roles } from 'src/common/interfaces';
import { Blesscomn } from './entities/blesscomn.entity';
import { BlesscomnReport } from './entities/blesscomn-report.entity';

@Injectable()
export class BlesscomnReportService {
  private logger = new Logger(BlesscomnReportService.name);
  constructor(
    private blesscomnRepo: BlesscomnRepository,
    private bcreportRepo: BlesscomnReportRepo,
  ) {}

  async create(
    createReport: CreateReportDto,
    image: Express.Multer.File,
    user: UserPayloadDto,
  ) {
    const { nama_blesscomn, date, ...res } = createReport;
    const queryBuilder = this.bcreportRepo.createQueryBuilder('report');
    queryBuilder
      .leftJoin('report.nama_blesscomn', 'bc')
      .addSelect('bc.nama_blesscomn')
      .andWhere('bc.nama_blesscomn = :s', { s: nama_blesscomn })
      .andWhere('report.date = :d', { d: date });
    const getReport = await queryBuilder.getOne();

    if (getReport)
      throw new BadRequestException(
        `report ${nama_blesscomn} ${new Date(
          date,
        ).toLocaleDateString()} has already exist!`,
      );

    const getBc = await this.blesscomnRepo.findOne({ nama_blesscomn });
    if (!getBc)
      throw new BadRequestException(
        `blesscomn ${nama_blesscomn} is not found!`,
      );

    const saveReport = await this.bcreportRepo.save({
      ...res,
      nama_blesscomn: getBc,
      date: date,
      created_by: user.username,
      updated_by: user.username,
    });

    return new ResponseDto({ data: saveReport });
  }

  async findAll(query: QueryReportDto, user: UserPayloadDto) {
    let getBlesscomn: Blesscomn;
    if (!user.role.some((val) => [Roles.ADMIN, Roles.LEADER].includes(val))) {
      const queryBuilder = this.blesscomnRepo.createQueryBuilder('bc');
      queryBuilder
        .leftJoin('bc.leader', 'leader')
        .andWhere('leader.nama_lengkap = :s', { s: user.username })
        .leftJoin('bc.vice_leader', 'vc')
        .orWhere('vc.nama_lengkap = :s', { s: user.username });

      getBlesscomn = await queryBuilder.getOne();
    }

    const data = await this.bcreportRepo.pagination(
      query as PageOptionDto,
      query as GetReportDto,
      getBlesscomn?.nama_blesscomn,
    );
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.bcreportRepo.findOne(id);
    if (!data) throw new BadRequestException(`blesscomn is not found`);

    return new ResponseDto({ data });
  }

  async update(
    id: string,
    updateReport: UpdateReportDto,
    image: Express.Multer.File,
    user: any,
  ) {
    const { date, ...res } = updateReport;
    const queryReport = this.bcreportRepo.createQueryBuilder('report');
    queryReport
      .leftJoin('report.nama_blesscomn', 'bc')
      .addSelect('bc.nama_blesscomn')
      .where('report.id = :s', { s: id });
    const getReport = await queryReport.getOne();
    if (!getReport)
      throw new BadRequestException(
        `report ${new Date(date).toLocaleDateString()} is not found`,
      );

    let checkReport: BlesscomnReport;
    const checkDate = getReport.date == date;

    if (!checkDate) {
      const queryBuilder = this.bcreportRepo.createQueryBuilder('report');
      queryBuilder
        .andWhere('report.date = :d', { d: date })
        .leftJoin('report.nama_blesscomn', 'bc')
        .addSelect('bc.nama_blesscomn')
        .andWhere('bc.nama_blesscomn = :s', {
          s: getReport.nama_blesscomn.nama_blesscomn,
        });
      checkReport = await queryBuilder.getOne();
    }

    if (checkReport)
      throw new BadRequestException(
        `report ${getReport.nama_blesscomn.nama_blesscomn} ${new Date(
          date,
        ).toLocaleDateString()} has already exist!`,
      );

    const saveReport = await this.bcreportRepo.save({
      ...getReport,
      ...res,
      date: date,
      updated_by: user.username,
    });
    return new ResponseDto({
      message: 'blesscomn report has been updated!',
      data: saveReport,
    });
  }

  async remove(id: string) {
    const queryReport = this.bcreportRepo.createQueryBuilder('report');
    queryReport
      .leftJoin('report.nama_blesscomn', 'bc')
      .addSelect('bc.nama_blesscomn')
      .where('report.id = :s', { s: id });
    const getReport = await queryReport.getOne();
    if (!getReport) throw new BadRequestException(`report is not found`);

    await this.bcreportRepo.remove(getReport);
    return new ResponseDto({
      message: `report ${getReport.nama_blesscomn} ${new Date(
        getReport.date,
      ).toLocaleDateString()} success deleted!`,
    });
  }
}
