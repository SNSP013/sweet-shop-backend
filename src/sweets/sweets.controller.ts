import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('sweets')
@UseGuards(JwtAuthGuard)
export class SweetsController {
  constructor(private sweetsService: SweetsService) {}

  @Post()
  create(@Body() body: CreateSweetDto) {
    return this.sweetsService.create(body);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.sweetsService.findAll(query);
  }

  @Get('search')
  search(@Query() query: any) {
    return this.sweetsService.search(query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateSweetDto) {
    return this.sweetsService.update(Number(id), body);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.sweetsService.delete(Number(id));
  }
}
