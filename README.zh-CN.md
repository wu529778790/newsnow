# NewsNow

![](screenshots/preview.light.png#gh-light-mode-only)
![](screenshots/preview.dark.png#gh-dark-mode-only)

[English](./README.md) | 简体中文

***优雅地阅读实时热门新闻***

## 部署

如果不需要登录，缓存，可以直接部署到 Cloudflare Pages，Vercel 等。Fork 之后在对应平台上导入即可。Cloudflare Pages 的构建输出文件夹是 `dist/output/public`。

登录涉及到 Github Oauth，只需要 [创建一个 Github App](https://github.com/settings/applications/new) 即可，不需要申请任何权限。然后就会得到 Client ID 和 Client Secret。关于环境变量，不同平台有不同的填写位置，请关注 `example.env.server` 文件。如果本地运行，需要将其重命名为 `.env.server`，然后按照要求添加。

```env
# Github Clien ID
G_CLIENT_ID=
# Github Clien Secret
G_CLIENT_SECRET=
# JWT Secret, 通常就用 Clien Secret
JWT_SECRET=
# 初始化数据库, 首次运行必须设置为 true，之后可以将其关闭
INIT_TABLE=true
```

本项目主推 Cloudflare Pages 以及 Docker 部署， Vercel 需要你自行搞定数据库，其他支持的数据库可以查看 https://db0.unjs.io/connectors 。

Cloudflare D1 数据库可以免费使用，在 Cloudflare Worker 控制面板里找到 D1 手动创建数据库，将 `database_id` 以及 `database_name` 填入 `wrangler.toml` 对应位置即可。下次部署时就可以生效了。

Docker 部署，只需要项目根目录 `docker-compose.yaml` 文件，同一目录下执行
```
docker compose up
```

## 开发
> [!TIP]
> node version >= 20

```bash
corepack enable
pnpm i
pnpm dev
```

你可能想要添加数据源，请关注 `shared/metadata` `shared/sources` `server/sources`，项目类型完备，结构简单，请自行探索。

## License

[MIT](./LICENSE) © ourongxing
