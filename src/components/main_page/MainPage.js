/**
 * Created on 03/9/17.
 */
import React, {Component} from 'react';

class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            cardsList: [
                {
                    title: 'DEFINE',
                    description: "The product team produces the best. Let's suppose it doesn't. It would still... No, we can't say that, it does.",
                    icon: 'fa-cogs'
                },
                {
                    title: 'DESIGN',
                    description: "Our team of designers is the best. It really is. We have the best designers.",
                    icon: 'fa-pencil'
                },
                {
                    title: 'DEVELOP',
                    description: "We have the absolute best developtment team anyone could have. We do, trust me.",
                    icon: 'fa-code'
                },
                {
                    title: 'DELIVER',
                    description: "Our Delivery team is awesome. We have the best cars, the best drivers, just awesome.",
                    icon: 'fa-cloud'
                }
            ]
        };
        this.cards = [{
            'container': null,
            'title': null,
            'icon': null
        }, {
            'container': null,
            'title': null,
            'icon': null
        }, {
            'container': null,
            'title': null,
            'icon': null
        }, {
            'container': null,
            'title': null,
            'icon': null
        }];
    }

    setCardsPosition() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].container.style.transform = 'translateY(' + -(document.body.scrollTop / 4) + 'px) translateZ(0)';
            this.cards[i].title.style.transform = 'translateY(' + (this.cards[i].container.getBoundingClientRect().top / 10) + 'px) translateZ(0)';
            this.cards[i].icon.style.transform = 'translateY(' + (this.cards[i].container.getBoundingClientRect().top / 4) + 'px) translateZ(0)';
        }
    }

    setNavigationPosition() {
        // this.navigationCurrentBar.style.top = (document.body.scrollTop / document.body.scrollHeight * 100) + '%';
        // this.navigationCurrentBar.style.height = (document.body.offsetHeight / document.body.scrollHeight * 100) + '%';
    }

    componentDidMount() {
        this.setCardsPosition();
        this.setNavigationPosition();

        window.addEventListener('scroll', () => {
            this.setCardsPosition();
            this.setNavigationPosition();
        });
        window.addEventListener('resize', () => {
            // this.navigationCurrentBar.style.height = (document.body.offsetHeight / document.body.scrollHeight * 100) + '%';
        })
    }

    render() {
        return (
            <div className="page-container" id="main-page-container">
                <div id="rodeapps-title">
                    <span>RODE</span><span>APPS</span>
                </div>
                <div id="mini-icons-container">
                    <icon className="fa fa-database" aria-hidden="true"/>
                    <icon className="fa fa-apple" aria-hidden="true"/>
                    <icon className="fa fa-android" aria-hidden="true"/>
                    <icon className="fa fa-code" aria-hidden="true"/>
                    <icon className="fa fa-database" aria-hidden="true"/>
                    <icon className="fa fa-mobile-phone" aria-hidden="true"/>
                    <icon className="fa fa-pie-chart" aria-hidden="true"/>
                    <icon className="fa fa-desktop" aria-hidden="true"/>
                    <icon className="fa fa-laptop" aria-hidden="true"/>
                    <icon className="fa fa-chrome" aria-hidden="true"/>
                    <icon className="fa fa-cloud" aria-hidden="true"/>
                </div>
                <div id="main-motto">This is a great motto text. It is. Even if it's not, we'll make it great.</div>

                {/*<div id="navigation-container">*/}
                    {/*<div id="current-bar" ref={(navigationCurrentBar) => {*/}
                        {/*this.navigationCurrentBar = navigationCurrentBar*/}
                    {/*}}/>*/}
                {/*</div>*/}

                {this.state.cardsList.map((element, index, array) => {
                    return (
                        <div key={element.title} ref={(cardContainer) => {
                            this.cards[index].container = cardContainer
                        }} className="card black">
                            <span className="card-title" ref={(cardTitle) => {
                                this.cards[index].title = cardTitle
                            }}>{element.title}</span>

                            <span className="card-description">{element.description}</span>

                            <icon className={`card-icon fa ${element.icon}`} aria-hidden="true" ref={(cardIcon) => {
                                this.cards[index].icon = cardIcon
                            }}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MainPage;
