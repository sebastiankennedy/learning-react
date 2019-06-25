import React, {Component} from 'react';
import {Row, Col} from 'antd';
import './App.less';

import Header from './components/Header';
import Footer from './components/Footer';
import LeftSidebar from './components/LeftSidebar';

class App extends Component {
    render() {
        return (
            <Row className="container">
                <Col span={4} className="left-sidebar-container">
                    <LeftSidebar/>
                </Col>
                <Col span={20} className="main">
                    <Header/>
                    <Row className="content">
                        Content
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}

export default App;