import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const format = (val) => `$` + val;
const parse = (val) => val.replace(/^\$/, '');

const sliderMarkStyles = {
  mt: '2',
  ml: '-1',
  fontSize: 'sm',
};

const FormCreateReview = ({ type, id }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      reviewDescription: '',
      ratingQuality: 3,
      ratingCommunication: 3,
      cost: 0,
      orderedAt: null,
      receivedAt: null,
      isAnonymous: false,
    },
  });

  const costDisplay = watch('cost', 0);

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        //alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  };

  // Load loader and
  if (isSubmitting) {
    return (
      <Center as={Stack} spacing={10} my={4}>
        <Text fontSize="2xl">Submitting your review...</Text>
        <Spinner thickness={2} size="xl" />
      </Center>
    );
  } else if (isSubmitSuccessful) {
    return (
      <Center my={4}>
        <Text fontSize="2xl">Your review has been submitted.</Text>
      </Center>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="reviewDescription"
        mb={3}
        isInvalid={errors?.reviewDescription}
        isRequired
      >
        <FormLabel>Review Description</FormLabel>
        <Textarea
          placeholder="Enter a brief review here"
          {...register('reviewDescription', {
            required: true,
            minLength: {
              value: 10,
              message: 'Minimum length of review is 10 characters',
            },
            maxLength: {
              value: 65535,
              message: "You need to cut down, it's taking up too much space",
            },
          })}
        />
        <FormErrorMessage>
          {errors?.reviewDescription?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl id="ratingQuality" mb={8} isRequired>
        <FormLabel>Quality of Work</FormLabel>
        <Slider
          aria-label="slider-quality-rating"
          onChange={(val) => setValue('ratingQuality', val)}
          min={1}
          max={5}
          step={1}
        >
          <SliderMark value={1} {...sliderMarkStyles}>
            1
          </SliderMark>
          <SliderMark value={3} {...sliderMarkStyles}>
            3
          </SliderMark>
          <SliderMark value={5} {...sliderMarkStyles}>
            5
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl id="ratingCommunication" mb={6} isRequired>
        <FormLabel>Level of Communication</FormLabel>
        <Slider
          aria-label="slider-communication-rating"
          onChange={(val) => setValue('ratingCommunication', val)}
          min={1}
          max={5}
          step={1}
        >
          <SliderMark value={1} {...sliderMarkStyles}>
            1
          </SliderMark>
          <SliderMark value={3} {...sliderMarkStyles}>
            3
          </SliderMark>
          <SliderMark value={5} {...sliderMarkStyles}>
            5
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <Stack direction="row" spacing={4} mb={3}>
        <FormControl id="cost" isRequired>
          <FormLabel>Cost</FormLabel>
          <NumberInput
            min={0}
            onChange={(valueString) => setValue('cost', parse(valueString))}
            value={format(costDisplay)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>
            How much did it cost? (in USD, round if necessary)
          </FormHelperText>
        </FormControl>

        {type === 'photographer' && (
          <FormControl id="location" isInvalid={errors?.location}>
            <FormLabel>Location</FormLabel>
            <Input
              {...register('location', {
                maxLength: {
                  value: 255,
                  message: 'Location name too long',
                },
              })}
            />
            <FormHelperText>
              Enter event name, place, or leave blank
            </FormHelperText>
            <FormErrorMessage>{errors?.location?.message}</FormErrorMessage>
          </FormControl>
        )}
      </Stack>

      <Stack direction="row" spacing={4} mb={8}>
        <FormControl id="orderedAt" isInvalid={errors?.orderedAt} isRequired>
          <FormLabel>Date Ordered</FormLabel>
          <Input
            type="date"
            placeholder="Select date"
            {...register('orderedAt', { required: true })}
          />
          <FormErrorMessage>{errors?.orderedAt?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="receivedAt" isInvalid={errors?.receivedAt}>
          <FormLabel>Date Recieved</FormLabel>
          <Input
            type="date"
            placeholder="Select date"
            {...register('receivedAt')}
          />
          <FormErrorMessage>{errors?.receivedAt?.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <FormControl id="isAnonymous" display="flex" alignItems="center">
        <FormLabel mb={0}>Post Anonymously?</FormLabel>
        <Switch {...register('isAnonymous')} />
      </FormControl>

      <Button type="submit" colorScheme="green" my={3} isLoading={isSubmitting}>
        Submit Review
      </Button>
    </Box>
  );
};

export default FormCreateReview;
