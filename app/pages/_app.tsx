import '../styles/globals.css'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { Layout, Typography } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import { wrapper } from '../store/configure';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header>
        <Typography.Title style={{ color: "#aaaaaa" }}>
          Linecoaching
        </Typography.Title>
      </Header>
      <Content className="content">
        <Component {...pageProps} />
      </Content>
    </Layout>
  );
}

export default wrapper.withRedux(MyApp)
