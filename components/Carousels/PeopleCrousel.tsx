import styled from "@emotion/styled";
import { useRouter as useNavigate } from "next/router";
import Wrap from "../CarouselSlices/Wrap";
import Carousel from "./Carousel";
import { Person } from "../../types/tmdb";

interface PeopleCrouselProps {
  data: Person[];
  title: string;
}

function PeopleCrousel({ data, title }: PeopleCrouselProps) {
  const navigate = useNavigate();

  return (
    <>
      {title && <Title>{title}</Title>}
      <Carousel>
        {data &&
          data.map((member) => (
            <PeopleContainer key={member.id}>
              <Card
                role="presentation"
                onClick={() => {
                  navigate.push(`/person/${member.id}`);
                }}
              >
                <Wrap
                  alt={member.name!}
                  src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                />
              </Card>
              <Detail>{member.name}</Detail>
            </PeopleContainer>
          ))}
      </Carousel>
    </>
  );
}

export default PeopleCrousel;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin: 20px 0;
  @media (max-width: 724px) {
    font-size: 20px;
  }
`;

const PeopleContainer = styled.div``;

const Card = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  width: 100%;

  &:first-child {
    margin-left: 0;
  }

  div {
    flex: 2;
    &:hover {
      transform: none !important;
    }
  }
`;

const Detail = styled.div`
  flex-shrink: 2;
  font-size: 20px;
  font-weight: 500;
  margin-top: 6px;
  text-align: center;
  div {
    color: #a6a6a6;
    font-size: 15px;
    text-align: center;
  }
  @media (max-width: 724px) {
    font-size: 15px;
    div {
      font-size: 11px;
    }
  }

  &:hover {
    transform: scale(1.1);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 3000ms;
  }
`;
