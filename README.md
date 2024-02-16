# Square Cloud - BOT Manager

Um bot de discord, em que você pode gerenciar suas aplicações da hospedagem [Squarecloud](https://squarecloud.app/dashboard)

## Linguagem e pacotes utilizados

[Typescript](https://www.typescriptlang.org]), [Discord.js](https://discord.js.org),
[@squarecloud/api](https://www.npmjs.com/package/@squarecloud/api)

## Funcionalidades

- Iniciar / Parar / Reiniciar sua aplicação
- Obtenção do status ( ram, cpu, rede, ssd )
- Obtenção dos logs
- Realização de backups
- Upload de novas aplicações

## Instalação

Para a aplicação funcionar corretamente, é necessário ter o [Node.js](https://nodejs.org/en/download) instalado em sua maquina na versão 20 ou superior, e uma conta na [Square Cloud](https://squarecloud.app)

#### Clonando o projeto e entrando na pasta

```
  git clone https://github.com/SnaffX/embreve
  cd squarecloud-manager
```

#### Instalando

```
npm install
```

## Configurando

Para rodar esse projeto, vá no arquivo **.env** e edite as seguintes variavéis

**discord_token** - Token do seu bot do discord criado em [Portal dos Desenvolvedores](https://discord.com/developers/applications)

**square_token** - Token sua conta da SquareCloud que pode ser obtido em [minha conta](https://squarecloud.app/dashboard/account)

## Iniciando

```
  npm run build
  npm run start:prod
```

## Autores

- [@SnaffX](https://github.com/SnaffX)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
