import { Bidder } from '../../static/interfaces/Bidder';
import { getFormatedDate, getShortCurrency } from '../../utils/utils';
import './bidders.css';
import { data } from '../../static/bidders';
import { useState } from 'react';
import Carosuel from '../Carosuel/Carosuel';
import AuctionProductCard from '../AuctionProductCard/AuctionProductCard';
import { products } from '../../static/products';

const getColorClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'color-primary';
    case 2:
      return 'color-dark';
    default:
      return 'color-light';
  }
}
const Bidders = (props: PropsType) => {
  const [activeBidder, setActiveBidder] = useState(data[0].id);

  return (
    <>
      <div className="bidders-layout weight-light">
        <h2 className="title color-secondary size-extremely-large w-100 text-center mb-5 weight-thin">Current Bidders</h2>
        <ul className="list-unstyled">
          {
            data.map(item => {
              return (
                <li className={"media mb-3 w-100 d-flex" + (item.id === activeBidder ? ' active' : '')} onClick={() => {
                  setActiveBidder(item.id);
                }}
                  key={item.id}
                >
                  <img className="mr-3 avatar" src={item.avatar} alt="avatar" />
                  <div className="media-body d-flex flex-column align-items-between">
                    <div className="title-layout ">
                      <h5 className="mt-0 mb-1 size-extremely-small color-dark">
                        <span>MEMBER NAME:</span>
                        <span className="px-2 color-primary name">{item.name}</span>
                        <span className="px-2">Member Since: {getFormatedDate(item.member_since)}</span>
                      </h5>
                      <span className="size-extremely-small responsive-none ">{item.comment}</span>
                    </div>
                    <div className="recent-win mt-auto">
                      <h5 className="color-light">MOST RECENT WIN:
                        <span className="br-light-1 px-2">{item.recent_win.title}</span>
                        <span className="br-light-1 px-2">{getShortCurrency(item.recent_win.price)}</span>
                        <span className="px-2">{getFormatedDate(item.recent_win.date)}</span>
                      </h5>
                    </div>
                  </div>
                  <h5 className={"bid-count size-medium responsive-none " + getColorClass(item.rank)}>{item.point} Entries</h5>
                  <h5 className={"bid-count size-tiny responsive-visible "}>{item.point}</h5>
                </li>
              )
            })
          }

        </ul>
      </div>
      <div className="upcomming-auction-second weight-light">
        <h2 className="title color-dark size-extremely-large w-100 text-center weight-thin">Upcoming Auctions</h2>
        <Carosuel visibleControl={false} itemClass="carousel-item-class" mobileItemCount={1}>
          {
            products.map(product => {
              return <AuctionProductCard item={product}></AuctionProductCard>
            })
          }
        </Carosuel>
      </div>
    </>
  );
}

interface PropsType {

}
export default Bidders;