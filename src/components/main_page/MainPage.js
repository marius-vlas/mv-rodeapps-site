/**
 * Created on 03/9/17.
 */
import React, {Component} from 'react';
import {scroller} from 'react-scroll';


const browserIsMobile = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            check = true;
        }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

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
            const iconTranslate = Math.max(-30, Math.min(this.cards[i].container.getBoundingClientRect().top / 4, 180));
            this.cards[i].title.style.transform = 'translateY(' + titleTranslate + 'px) translateZ(0)';
            this.cards[i].icon.style.transform = 'translateY(' + iconTranslate + 'px) translateZ(0)';
        }
    }

    highlightNavigationLabels() {
        const barTop = this.navigationCurrentBar.getBoundingClientRect().top;
        const barHeight = this.navigationCurrentBar.offsetHeight;

        for (let i = 0; i < this.navigationElements.length; i++) {
            const labelElement = this.navigationElements[i];

            if (labelElement.getBoundingClientRect().top + 20 > barTop && labelElement.getBoundingClientRect().top + 40 < barTop + barHeight) {
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
        if (!browserIsMobile()) {
            this.setNavigationPosition();
        }

        window.addEventListener('scroll', () => {
            this.setCardsPosition();

            if (!browserIsMobile()) {
                this.setNavigationPosition();
            }
        });

        if (!browserIsMobile()) {
            window.addEventListener('resize', () => {
                this.setNavigationPosition();
            });
        }


        if (!browserIsMobile()) {

            this.navigationCurrentBar.addEventListener('mousedown', (event) => {
                this.initialPageY = event.screenY;
                this.initialScroll = document.body.scrollTop;

                window.addEventListener('mousemove', this.handleScrollDrag);
            });
            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', this.handleScrollDrag);
            });
        }

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

                {!browserIsMobile() ?
                    (
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
                    )
                    : null
                }

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
