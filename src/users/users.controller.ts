import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './users-update.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /*
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUsersController(@Body() newUser: CreateUserDto) {
    if (validateUser(newUser))
      return this.usersService.createUsersService(newUser);
    else return 'User no válido';
  }*/

  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  findAllUsersController(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.usersService.findAllUsersService(page, limit);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findOneUsersController(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneUsersService(id);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Put(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateUsersController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    try {
      return this.usersService.updateUsersService(id, updateUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('setAdmin/:id')
  setAdminController(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.setAdminService(id);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUsersController(@Param('id', ParseUUIDPipe) id: string) {
    console.log('En controller antes de llamar al service. id de User: ', id);
    return this.usersService.deleteUsersService(id);
  }
}
