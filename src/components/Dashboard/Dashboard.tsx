import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Divider from 'antd/es/divider';
import Link from 'next/link';
import CustomNavigation from './CustomNavigation';

const { Header, Content, Sider } = Layout;

const headerItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const navItems: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1) as string;

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);


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
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={headerItems} />
            </Header>
            <Layout>
                <Sider width={210} style={{ background: colorBgContainer }}>
                    <CustomNavigation />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* TODO: breadcrumb generator */}
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        Content
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