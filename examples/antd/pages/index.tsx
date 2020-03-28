import React from "react";
import { Layout, Menu, Breadcrumb, Button, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;

function StartPage() {
  return (
    <Layout>
      <Header>
        <Row justify="center">
          <Col span={12}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">Link 1</Menu.Item>
              <Menu.Item key="2">Active Link 2</Menu.Item>
              <Menu.Item key="3">Link 3</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row justify="center">
          <Col span={12}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <div>
              <h1>Hello World</h1>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </p>

              <Button type="primary">Primary Button</Button>
            </div>
          </Col>
        </Row>
      </Content>

      <Footer>
        <Row justify="center">
          <Col span={12}>©2019 vilicando-core</Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default StartPage;
