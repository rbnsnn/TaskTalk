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
    Patch,
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Role } from 'src/roles/enums/role.enum'
import { Roles } from 'src/roles/decorators/roles.decorator'
import { RolesGuard } from 'src/roles/guards/roles.guard'
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

    @UseGuards(RolesGuard)
    @Post('/labels/new')
    @Roles(Role.MODERATOR)
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

    @UseGuards(RolesGuard)
    @Delete('/labels/:label')
    @Roles(Role.MODERATOR)
    async deleteLabel(@Request() req, @Param('label') label) {
        const { companyId } = req.user
        const labelExists = await this.companiesService.findOneLabel(companyId, label)
        if (labelExists) {
            await this.companiesService.deleteLabel(companyId, label)
        } else {
            throw new BadRequestException('Something went wrong')
        }
    }

    @UseGuards(RolesGuard)
    @Patch('/labels/:label')
    @Roles(Role.MODERATOR)
    async updateLabel(@Request() req, @Param('label') label, @Body() body) {
        const { companyId } = req.user
        const labelExists = await this.companiesService.findOneLabel(companyId, label)
        if (labelExists) {
            await this.companiesService.updateLabel(companyId, label, body)
        } else {
            throw new BadRequestException('Something went wrong')
        }
    }
}
