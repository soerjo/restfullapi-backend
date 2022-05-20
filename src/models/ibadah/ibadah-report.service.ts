import { Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto, PageOptionDto } from 'src/common/dto';
import { UserPayloadDto } from 'src/common/dto/user-payload.dto';
import { Repository } from 'typeorm';
import { GetReportDto, QueryReportDto, UpdateReportDto } from './dto';
import { CreateReportDto } from './dto/create-report.dto';
import { IbadahReport } from './entities/ibadah-report.entity';
import { Ibadah } from './entities/ibadah.entity';
import { IbadahReportRepository } from './ibadah-report.repository';

export class IbadahReportService {
  private logger = new Logger(IbadahReportService.name);
  constructor(
    @InjectRepository(Ibadah)
    private ibadahRepo: Repository<Ibadah>,
    private ibadahReportRepo: IbadahReportRepository,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    image: Express.Multer.File,
    user: UserPayloadDto,
  ) {
    const { nama_ibadah, date, ...res } = createReportDto;
    const queryBuilder = this.ibadahReportRepo.createQueryBuilder('report');
    queryBuilder
      .leftJoin('report.ibadah', 'ibadah')
      .addSelect('ibadah.nama_ibadah')
      .andWhere('ibadah.nama_ibadah = :s', { s: nama_ibadah })
      .andWhere('report.date = :d', { d: date });
    const getReport = await queryBuilder.getOne();

    if (getReport)
      throw new BadRequestException(
        `report ${nama_ibadah} ${new Date(
          date,
        ).toLocaleDateString()} has already exist!`,
      );

    const getIbadah = await this.ibadahRepo.findOne({ nama_ibadah });
    if (!getIbadah)
      throw new BadRequestException(`blesscomn ${nama_ibadah} is not found!`);

    const createReport = this.ibadahReportRepo.create({
      ...res,
    });
    createReport.ibadah = getIbadah;
    createReport.date = date + '';
    createReport.created_by = user.username;
    createReport.updated_by = user.username;

    const saveReport = await this.ibadahReportRepo.save(createReport);
    return new ResponseDto({ data: saveReport });
  }

  async findAll(query: QueryReportDto) {
    const data = await this.ibadahReportRepo.pagination(
      query as PageOptionDto,
      query as GetReportDto,
    );
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.ibadahReportRepo.findOne(id);
    if (!data) throw new BadRequestException(`ibadah is not found`);

    return new ResponseDto({ data });
  }

  async update(
    id: string,
    updateReport: UpdateReportDto,
    image: Express.Multer.File,
    user: any,
  ) {
    const { date, ...res } = updateReport;

    // get ibadah-report from id
    const queryReport = this.ibadahReportRepo.createQueryBuilder('report');
    queryReport
      .leftJoin('report.ibadah', 'ibadah')
      .addSelect('ibadah.nama_ibadah')
      .where('report.id = :s', { s: id });
    const getReport = await queryReport.getOne();
    if (!getReport)
      throw new BadRequestException(
        `report ${new Date(date).toLocaleDateString()} is not found`,
      );

    // check exist report from date.
    // if report exist not updated!
    let checkReport: IbadahReport;
    if (date && date.toString() !== getReport.date) {
      this.logger.log('fired!: ', date);
      const queryBuilder = this.ibadahReportRepo.createQueryBuilder('report');
      queryBuilder
        .andWhere('report.date = :d', { d: date })
        .leftJoin('report.ibadah', 'ibadah')
        .addSelect('ibadah.nama_ibadah')
        .andWhere('ibadah.nama_ibadah = :s', {
          s: getReport.ibadah.nama_ibadah,
        });
      checkReport = await queryBuilder.getOne();
    }
    if (checkReport)
      throw new BadRequestException(
        `report ${getReport.ibadah.nama_ibadah} ${new Date(
          date,
        ).toLocaleDateString()} has already exist!`,
      );

    // create and save data Ibadah-report
    const createReport = this.ibadahReportRepo.create({
      ...getReport,
      ...res,
    });
    createReport.updated_by = user.username;
    if (date) createReport.date = date + '';
    const saveReport = await this.ibadahReportRepo.save(createReport);

    return new ResponseDto({
      message: 'blesscomn report has been updated!',
      data: saveReport,
    });
  }

  async remove(id: string) {
    const queryReport = this.ibadahReportRepo.createQueryBuilder('report');
    queryReport
      .leftJoin('report.ibadah', 'ibadah')
      .addSelect('ibadah.nama_ibadah')
      .where('report.id = :s', { s: id });
    const getReport = await queryReport.getOne();
    if (!getReport) throw new BadRequestException(`report is not found`);

    await this.ibadahReportRepo.remove(getReport);
    return new ResponseDto({
      message: `report ${getReport.ibadah} ${new Date(
        getReport.date,
      ).toLocaleDateString()} success deleted!`,
    });
  }
}
