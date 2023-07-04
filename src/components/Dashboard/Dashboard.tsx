import React from 'react';
import { MenuProps, Spin } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Divider } from 'antd';
import Link from 'next/link';
import CustomNavigation from './CustomNavigation';
import CustomHeader from './CustomHeader';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { capitalize } from '../../../lib/functions';
import { useSession } from 'next-auth/react';

const { Header, Content, Sider, Footer } = Layout;

const headerItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));


type Props = {
    children?: React.ReactNode,
};

const Dashboard: React.FC = ({ children }: Props) => {

    //TODO:  Do authentication check here.
    const { data: session, status } = useSession();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter();
    const { pathname } = router;

    // TODO: could add href
    const getPathDetails = (pathname: string) => {
        const paths = pathname.split("/").filter(p => p.length > 0);
        if (paths.includes('[clientId]')) {
            return paths.slice(0, paths.indexOf('[clientId]')).map(path => capitalize(path));
        };
        return paths.map(path => capitalize(path));
    };
    const breadcrumbs = getPathDetails(pathname);

    // if (status === 'unauthenticated') {
    //     return (
    //         <div> This is a protected page. You need to be logged in</div>
    //     );
    // }

    return (
        <Layout>
            <Toaster />
            <CustomHeader />
            <Layout>
                <Sider width={210} style={{ background: colorBgContainer }}>
                    <CustomNavigation />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* TODO: breadcrumb generator */}
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbs.map((path, index) => (
                            <Breadcrumb.Item key={index}>{path !== '[id]' ? path : 'Edit'}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            overflow: 'auto',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                m3b - all rights reserved
                <Divider type='vertical' />
                <Link href="/">HOME</Link>
            </Footer>
        </Layout>
    );
};

export default Dashboard;