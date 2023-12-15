import { 
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from '@nestjs/common';

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FrontendService } from './frontend.service';
import { readFileSync, writeFile, writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Controller('frontend')
export class FrontendController {

    constructor(private service: FrontendService, private config: ConfigService) {
        const ip = config.get('IPV4_REDE_SEM_FIO_WIFI');

        const paginaCadastro = readFileSync('./front-end/src/cadastro.html', 'utf-8');
        const paginaConteudo = readFileSync('./front-end/src/conteudo.html', 'utf-8');
        const paginaHome = readFileSync('./front-end/src/home.html', 'utf-8');
        const paginaLogin = readFileSync('./front-end/src/login.html', 'utf-8');
        const paginaRedirecionamento = readFileSync('./front-end/src/redirecionamento.html', 'utf-8');

        const jsCadastro = readFileSync('./public/js/cadastro.js', 'utf-8');
        const jsLoad = readFileSync('./public/js/load.js', 'utf-8');
        const jsLogin = readFileSync('./public/js/login.js', 'utf-8');
        const jsRedirecionamento = readFileSync('./public/js/redirecionamento.js', 'utf-8');

        const rePaginaCadastro = paginaCadastro.replaceAll('YOUR_IP_HERE', ip);
        const rePaginaConteudo = paginaConteudo.replaceAll('YOUR_IP_HERE', ip);
        const rePaginaHome = paginaHome.replaceAll('YOUR_IP_HERE', ip);
        const rePaginaLogin = paginaLogin.replaceAll('YOUR_IP_HERE', ip);
        const rePaginaRedirecionamento = paginaRedirecionamento.replaceAll('YOUR_IP_HERE', ip);
        
        const reJsCadastro = jsCadastro.replaceAll('YOUR_IP_HERE', ip);
        const reJsLoad = jsLoad.replaceAll('YOUR_IP_HERE', ip);
        const reJsLogin = jsLogin.replaceAll('YOUR_IP_HERE', ip);
        const reJsRedirecionamento = jsRedirecionamento.replaceAll('YOUR_IP_HERE', ip);
        
        writeFileSync('./front-end/src/cadastro.html', rePaginaCadastro, 'utf-8');
        writeFileSync('./front-end/src/conteudo.html', rePaginaConteudo, 'utf-8');
        writeFileSync('./front-end/src/home.html', rePaginaHome, 'utf-8');
        writeFileSync('./front-end/src/login.html', rePaginaLogin, 'utf-8');
        writeFileSync('./front-end/src/redirecionamento.html', rePaginaRedirecionamento, 'utf-8');

        writeFileSync('./public/js/cadastro.js', reJsCadastro, 'utf-8');
        writeFileSync('./public/js/load.js', reJsLoad, 'utf-8');
        writeFileSync('./public/js/login.js', reJsLogin, 'utf-8');
        writeFileSync('./public/js/redirecionamento.js', reJsRedirecionamento, 'utf-8');
    }
    
    @Get('entrar')
    signin() {
        return this.service.signin();
    }

    @Get('cadastro')
    signup() {
        return this.service.signup();
    }

    @Get('home')
    home() {
        return this.service.home();
    }
    
    @Get('conteudo')
    conteudo() {
        return this.service.load();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('conteudo_auth')
    conteudoAuth() {
        return this.service.conteudo();
    }

}
