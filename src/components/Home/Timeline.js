import PropTypes from 'prop-types';
import { Timeline as AntTimeline } from 'antd';
import { handleDescContent, utc2locale } from '../../core/util';
// import { ClockCircleOutlined } from '@ant-design/icons';
// import { color_primary } from '../../constants/CustomTheme';
import { useEffect, useState } from 'react';
import Router from 'next/router';

const { Item } = AntTimeline;

const Timeline = ({ list: POSTList }) => {
  const [timeLineMode, setTimeLineMode] = useState('alternate');

  const handleClick = (e, href) => {
    e.preventDefault();
    Router.push(`/post/[number]`, href);
  };

  useEffect(() => {
    const deviceWidth = window.screen.width || 0;
    console.log(deviceWidth);
    setTimeLineMode(deviceWidth && deviceWidth < 768 ? 'left' : 'alternate');
  }, []);

  return (
    <AntTimeline mode={timeLineMode}>
      {POSTList.map(item => {
        const { number, title, updated_at, body } = item;
        return (
          <Item key={title}>
            <span className="type">POST</span>
            <a
              href={`/post/${number}`}
              onClick={e => handleClick(e, `/post/${number}`)}
            >
              <span className="title">{title}</span>
              <br />
              <span className="time">{utc2locale(updated_at)}</span>
              <p className="content">{handleDescContent(body)}</p>
            </a>
          </Item>
        );
      })}
      <Item>
        <span className="type">POST</span>
        <a>
          <span className="title">hexh's page deployed.</span>
          <br />
          <span className="time">2020/07/11</span>
        </a>
      </Item>
      {
        // <Item>Create a services site 2015-09-01</Item>
        // <Item color="green">Solve initial network problems 2015-09-01</Item>
        // <Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
        //   Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        //   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
        //   ab illo inventore veritatis et quasi architecto beatae vitae dicta
        //   sunt explicabo.
        // </Item>
        // <Item color="red">Network problems being solved 2015-09-01</Item>
        // <Item>Create a services site 2015-09-01</Item>
        // <Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
        //   Technical testing 2015-09-01
        // </Item>
      }
      <style jsx>{`
        .title {
          font-weight: bold;
        }

        .type {
          cursor: default;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.15);
          margin-right: 10px;
        }

        .time {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }

        .content {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          color: rgba(0, 0, 0, 0.65);
          text-overflow: ellipsis;
        }
      `}</style>
    </AntTimeline>
  );
};

export default Timeline;

Timeline.propTypes = {
  list: PropTypes.array.isRequired,
};
