import { Controller, Get, NotFoundException, Request } from '@nestjs/common'
import { CompaniesService } from './companies.service'

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get('/names')
    async getColumnNames(@Request() req) {
        const columns = await this.companiesService.findColumns(req.user.companyId)

        if (columns) {
            return columns.map((column) => column.name)
        } else {
            throw new NotFoundException('Columns not found')
        }
    }
}
