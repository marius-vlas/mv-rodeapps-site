/**
 * Created on 03/9/17.
 */
import React, {Component} from 'react';
import {scroller} from 'react-scroll';
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
        this.navigationElements = [];

        this.handleScrollDrag = this.handleScrollDrag.bind(this);
    }

    setCardsPosition() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].container.style.transform = 'translateY(' + -(document.body.scrollTop / 4) + 'px) translateZ(0)';

            const titleTranslate = Math.max(0, Math.min(this.cards[i].container.getBoundingClientRect().top / 12, 190));
            const iconTranslate = Math.max(0, Math.min(this.cards[i].container.getBoundingClientRect().top / 5, 190));
            this.cards[i].title.style.transform = 'translateY(' + titleTranslate + 'px) translateZ(0)';
            this.cards[i].icon.style.transform = 'translateY(' + iconTranslate + 'px) translateZ(0)';
        }
    }

    highlightNavigationLabels() {
        const barTop = this.navigationCurrentBar.getBoundingClientRect().top;
        const barHeight = this.navigationCurrentBar.offsetHeight;

        for (let i = 0; i < this.navigationElements.length; i++) {
            const labelElement = this.navigationElements[i];

            if(labelElement.getBoundingClientRect().top + 20 > barTop && labelElement.getBoundingClientRect().top + 40 < barTop + barHeight) {
                labelElement.classList.add('highlighted');
            }
            else {
                labelElement.classList.remove('highlighted');
            }
        }
    }

    setNavigationPosition() {
        this.navigationCurrentBar.style.top = (document.body.scrollTop / document.body.scrollHeight * 100) + '%';
        this.navigationCurrentBar.style.height = (document.body.offsetHeight / document.body.scrollHeight * 100) + '%';
        const bodyHeight = document.body.scrollHeight;
        for (let i = 0; i < this.cards.length; i++) {
            this.navigationElements[i].style.top = (this.cards[i].container.offsetTop - document.body.scrollTop / 4) / bodyHeight * 100 + '%';
        }

        this.highlightNavigationLabels();
    }


    scrollToCard(index) {
        const clientRect = this.cards[index].container.getBoundingClientRect().top;
        if (clientRect < 0 || clientRect > document.body.offsetHeight - 600) {

            scroller.scrollTo(`card-${this.state.cardsList[index].title}`, {
                duration: 600,
                delay: 50,
                smooth: true,
                containerId: 'ContainerElementID',
                offset: -(clientRect + 336) / 4
            })
        }
    }

    handleScrollDrag(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (event.preventDefault) {
            event.preventDefault();
        }

        const heightsRatio = document.body.scrollHeight / this.navigationContainer.offsetHeight;
        const yDiff = event.screenY - this.initialPageY;
        window.scrollTo(0, this.initialScroll + yDiff * heightsRatio);
    }

    componentDidMount() {
        this.setCardsPosition();
        this.setNavigationPosition();

        window.addEventListener('scroll', () => {
            this.setCardsPosition();
            this.setNavigationPosition();
        });
        window.addEventListener('resize', () => {
            this.setNavigationPosition();
        });


        this.navigationCurrentBar.addEventListener('mousedown', (event) => {
            this.initialPageY = event.screenY;
            this.initialScroll = document.body.scrollTop;

            window.addEventListener('mousemove', this.handleScrollDrag);
        });
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.handleScrollDrag);
        });

    }

    render() {
        return (
            <div className="page-container" id="main-page-container">
                <div id="rodeapps-title"/>
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

                <div id="navigation-container" ref={(navigationContainer) => {
                    this.navigationContainer = navigationContainer
                }}>
                    <div id="current-bar" ref={(navigationCurrentBar) => {
                        this.navigationCurrentBar = navigationCurrentBar
                    }}/>
                    {this.state.cardsList.map((element, index, array) => {
                        return (
                            <span
                                onClick={() => this.scrollToCard(index)}
                                key={element.title}
                                ref={(navigationElement) => {
                                    this.navigationElements[index] = navigationElement;
                                }}>{element.title}</span>
                        )
                    })}
                </div>

                {this.state.cardsList.map((element, index, array) => {
                    return (
                        <div key={element.title} ref={(cardContainer) => {
                            this.cards[index].container = cardContainer
                        }} className="card black" id={`card-${element.title}`}>
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
