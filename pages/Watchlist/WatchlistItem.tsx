import { motion } from "framer-motion";
import Link from "next/link";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { detailLink } from "../../utils";

interface WatchlistItemProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  remove: Function;
  type: string;
}

function WatchlistItem({
  id,
  title,
  overview,
  type,
  posterPath,
  remove,
}: WatchlistItemProps) {
  return (
    <Item
      key={Titlebar}
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Thumbnail
        key={id}
        src={`https://image.tmdb.org/t/p/w154/${posterPath}`}
        alt={title}
      />
      <Detail>
        <Titlebar>
          <Title>{title} </Title>
          <Plus role="presentation" onClick={() => remove(id!)}>
            +
          </Plus>
        </Titlebar>
        <Overview>
          {" "}
          {overview === ""
            ? ""
            : `${overview!.split(" ").splice(0, 25).join(" ")} ..`}
        </Overview>
        <ViewButton href={detailLink(type, id, title)}>View</ViewButton>
      </Detail>
    </Item>
  );
}

export default WatchlistItem;

const Item = styled(motion.li)<any>`
  background-color: #090c14;
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 1px solid rgba(192, 192, 192, 0.2);
  border-radius: 8px;
  display: flex;
  flex: 1;
  margin: 20px;
  padding: 5px;
`;

const Thumbnail = styled.img`
  border-radius: 8px;
  width: 80px;
  @media (max-width: 724px) {
    width: 90px;
    height: 140px;
  }
`;

const Detail = styled.div`
  flex: 1;
  justify-content: center;
  margin-left: 10px;
`;

const Titlebar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const shake = keyframes`
  0% {
    transform: translateX(0px) rotate(45deg);
  }
  25% {
    transform: translateX(0.6px) rotate(45deg);
  }

  50% {
    transform: translateX(-0.6px) rotate(45deg);
  }
  100% {
    transform: translateX(0px) rotate(45deg);
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  max-height: 45px;
  padding-left: 5px;

  @media (max-width: 724px) {
    font-size: 15px;
  }
`;

const Plus = styled.div`
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transform: rotate(45deg);
  transition: all 200ms ease;
  &:hover {
    animation: ${shake} 100ms infinite;
    transform: scale(1.3) rotate(45deg);
  }
  &:active {
    transform: scale(0.9) rotate(45deg);
  }
  user-select: none;
`;

const Overview = styled.p`
  text-align: justify;
  text-justify: inter-word;

  @media (max-width: 724px) {
    font-size: 10px;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    line-height: 1.5;
    padding: 5px;
    text-align: justify;
  }
`;

const ViewButton = styled(Link)`
  background-color: #090c14;
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 1px solid silver;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  padding: 5px 20px;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  transition: all 200ms ease;
`;
