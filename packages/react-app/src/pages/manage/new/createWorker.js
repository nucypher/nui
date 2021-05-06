import React from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap/';
import Accordion from 'react-bootstrap/Accordion'
import {ButtonBox, NoBorderButton} from '../../../components'

import {ReactComponent as JoinPoolIcon} from '../../../assets/icons/joinPool.svg'
import {ReactComponent as ServiceProviderIcon} from '../../../assets/icons/serviceProvider.svg'
import {ReactComponent as SelfHostedIcon} from '../../../assets/icons/selfHostedWorker.svg'


import JoinPool from './nodeProviders/joinPool'
import ServiceProvider from './nodeProviders/serviceProviders'
import SelfHosted from './nodeProviders/selfHosted'

import {NavLink, Route, Switch, useRouteMatch} from 'react-router-dom'

import FAQ_QUESTIONS from './worker_faq.json'

export default (props) => {

    let { path, url } = useRouteMatch();

    return (
        <Container fluid="md">
            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Set Up a Worker or Join a Pool</h1>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12}  className="d-flex justify-content-center">
                    <ButtonBox id="stake-method-selector">
                        <NavLink className="new-stake-method" to={`${url}/service`} activeClassName="active"><NoBorderButton><ServiceProviderIcon/><div>Service Provider</div></NoBorderButton></NavLink>
                        <NavLink className="new-stake-method" to={`${url}/pwn`} activeClassName="active"><NoBorderButton><SelfHostedIcon/><div>Selfhosted Worker</div></NoBorderButton></NavLink>
                        <NavLink className="new-stake-method" to={`${url}/join`} activeClassName="active"><NoBorderButton><JoinPoolIcon/><div>Join Pool</div></NoBorderButton></NavLink>
                    </ButtonBox>
                </Col>
            </Row>
            <Row>
                <Switch>
                    <Route path={`${path}/join`}>
                        <JoinPool/>
                    </Route>
                    <Route path={`${path}/service`}>
                        <ServiceProvider workerAddress={props.workerAddress} setWorkerAddress={props.setWorkerAddress}/>
                    </Route>
                    <Route path={`${path}/pwn`}>
                        <SelfHosted workerAddress={props.workerAddress} setWorkerAddress={props.setWorkerAddress}/>
                    </Route>
                </Switch>
            </Row>

            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col sm={8} xs={12}>
                    <h4 className="d-flex justify-content-center mb-3">FAQ</h4>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col md={8} xs={12} className="d-flex justify-content-center">
                    <Accordion id="self-hosted-accordian">
                    {FAQ_QUESTIONS.map((faq, index) => (
                        <Card key={`faq${index}`}>
                            <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                                <b>{faq.question}</b><i className={true ? "faq-plus":"faq-minus"}></i>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index.toString()}>
                               <Card.Body>{faq.answer}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}