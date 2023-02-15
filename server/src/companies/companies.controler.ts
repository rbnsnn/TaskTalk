import {
    Controller,
    Get,
    Post,
    NotFoundException,
    ConflictException,
    Request,
    Body,
    Delete,
    Param,
    BadRequestException,
} from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateLabelDto } from './dtos/create-label.dto'

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get('/names')
    async getColumnNames(@Request() req) {
        const columns = await this.companiesService.findColumns(req.user.companyId)

        if (columns) {
            return columns
        } else {
            throw new NotFoundException('Columns not found')
        }
    }

    @Get('/labels')
    async getLabels(@Request() req) {
        const { companyId } = req.user

        const labels = await this.companiesService.findLabels(companyId)

        return labels
    }

    @Post('/labels/new')
    async addLabel(@Request() req, @Body() createLabelDto: CreateLabelDto) {
        const { companyId } = req.user
        const labelExists = await this.companiesService.findOneLabel(
            companyId,
            createLabelDto.label
        )
        if (labelExists) {
            throw new ConflictException('Label already exists')
        } else {
            return await this.companiesService.addLabel(companyId, createLabelDto)
        }
    }

    @Delete('/labels/:label')
    async deleteLabel(@Request() req, @Param('label') label) {
        const { companyId } = req.user
        const labelExists = await this.companiesService.findOneLabel(companyId, label)
        if (labelExists) {
            await this.companiesService.deleteLabel(companyId, label)
        } else {
            throw new BadRequestException('Something went wrong')
        }
    }
}
