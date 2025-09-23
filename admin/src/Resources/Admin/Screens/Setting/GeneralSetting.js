/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from '../../../Components/Loader';
import { settingRoute } from '../../../../Utils/List';
import Setting from "./Components/Setting"
import ProductTitles from './Components/ProductTitles';
import Coupons from "./Components/Coupons"
import Theme from "./Components/Theme"
import Shipping from "./Components/Shipping"
import Country from "./Components/Country"
import City from "./Components/City"
import State from "./Components/State"
import Pincode from "./Components/Pincode"
import SocialLink from "./Components/SocialLink"
import WebsiteThemes from "./Components/WebsiteThemes"
import Language from './Components/Language';
import OrderStatus from './Components/OrderStatus';

const GeneralSetting = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.AdminReducer.loader);
  const [routeState, setRouteState] = useState(1);

  useEffect(() => {

  }, [dispatch])

  return (
    <Wrapper>
      <section className="content bg-grey">
        <div className="row p-2">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h5 className='text-center font-weight-bold text-blue'>Manage Setting</h5>
              </div>
              <div className="card-body">
                <ul>
                  {settingRoute?.map((item) => {
                    return (
                      <li className='col-12 active' onClick={() => setRouteState(item.id)}>
                        <i className={`${item.image}`} />
                        <a className='col-sm-10 col-md-10 col-lg-10'>{item.title}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="bodyLayout">
              {routeState === 1 ? <Setting />
                : routeState === 2 ? <ProductTitles />
                  : routeState === 3 ? <Coupons />
                    : routeState === 4 ? <Theme />
                      : routeState === 5 ? <Shipping />
                        : routeState === 6 ? <Country />
                          : routeState === 7 ? <State />
                            : routeState === 8 ? <City />
                              : routeState === 9 ? <Pincode />
                                : routeState === 10 ? <SocialLink />
                                  : routeState === 11 ? <WebsiteThemes />
                                    : routeState === 12 ? <Language />
                                      : routeState === 13 ? <OrderStatus />
                                        : <Setting />}
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.parentLayout{
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.card{
  border-top: 3px solid #343a40;
}
.card-body{
  padding: 0px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.50rem;
  position: relative;
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,.125);
  cursor: pointer;

  a{
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  &:hover,
    &:active{
      a{
        color: orange;
      }
      i{
        color: orange;
      }
    }
}
.bodyLayout{
  width: 98%;
  max-height: 95%;
  background-color: white;
  transition: transform 0.6s;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  overflow-y: auto;
}
`;

export default GeneralSetting