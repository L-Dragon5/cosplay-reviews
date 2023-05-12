import { StarIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { differenceInCalendarDays, format } from 'date-fns';
import { useState } from 'react';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const turnaroundTime = review?.completedAt
    ? differenceInCalendarDays(
        new Date(review.completedAt),
        new Date(review.orderedAt),
      )
    : -1;

  const onTextClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  return (
    <Card key={review.id} size="sm">
      <CardHeader>
        <Heading size="md" mb={1}>
          {review.name}
        </Heading>
        <Stack direction="row" alignItems="center">
          {review.location ? (
            <>
              <Heading size="sm">{review.location}</Heading>
              <Text>-</Text>
              <Heading size="sm">
                {format(new Date(review.orderedAt), 'EEEE MMM do, Y')}
              </Heading>
            </>
          ) : (
            <Heading size="sm">
              {format(new Date(review.orderedAt), 'EEEE MMM do, Y')}
            </Heading>
          )}
        </Stack>
      </CardHeader>

      <CardBody>
        <Text
          noOfLines={expanded ? 0 : 3}
          cursor="pointer"
          onClick={onTextClick}
        >
          {review.reviewDescription}
        </Text>
      </CardBody>

      <CardFooter>
        <StatGroup gap={2} flexGrow="1">
          <Stat size="sm">
            <StatLabel>Cost</StatLabel>
            <StatNumber>${review.cost}</StatNumber>
            <StatHelpText>in USD</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>Turnaround Time</StatLabel>
            <StatNumber>
              {turnaroundTime < 0 ? 'Never received' : turnaroundTime}
            </StatNumber>
            <StatHelpText>in days</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>Quality</StatLabel>
            <StatNumber display="flex" alignItems="center">
              {review.ratingQuality}
              <StarIcon boxSize={4} ml={1} />
            </StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel>Communication</StatLabel>
            <StatNumber display="flex" alignItems="center">
              {review.ratingCommunication}
              <StarIcon boxSize={4} ml={1} />
            </StatNumber>
          </Stat>
        </StatGroup>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
