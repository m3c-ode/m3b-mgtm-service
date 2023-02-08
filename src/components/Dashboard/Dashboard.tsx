import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Divider from 'antd/es/divider';
import Link from 'next/link';
import CustomNavigation from './CustomNavigation';
import CustomHeader from './CustomHeader';

const { Header, Content, Sider } = Layout;

const headerItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));


type Props = {
    children?: React.ReactNode,
};

const Dashboard: React.FC = ({ children }: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            {/* TODO: CustomHeader */}
            {/* <Header className="something">
                <div className="logo" />

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={headerItems} />
            </Header> */}
            <CustomHeader />
            <Layout>
                <Sider width={210} style={{ background: colorBgContainer }}>
                    <CustomNavigation />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* TODO: breadcrumb generator */}
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>Beers</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
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