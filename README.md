# Documentation for the Slider Component

## Description

The `Slider` component is a scrollable slider that supports display on both desktop and mobile devices, with a varying number of visible slides and animations. The central slide is visually highlighted.

## Main Parameters

- **visibleSlidesCount**: The number of visible slides on the desktop.
- **slidesLength**: The number of original slides.
- **totalSlides**: The total number of slides, including clones, to ensure seamless scrolling.
- **centralSlideIndex**: The index of the central slide for highlighting.

## States

- **currentIndex**: The current slide index.
- **slideWidth**: The width of a slide.
- **currentZone**: The current cursor zone for navigation.
- **isAnimating**: A flag indicating whether an animation is in progress.
- **isLoading**: A flag for displaying the loading state.
- **isMobile**: A flag determining whether the device is mobile.

## Reactive Hooks

1. **useEffect**: Monitors window size changes and determines whether the device is mobile.
2. **useLayoutEffect**: Sets slide dimensions based on container width on the desktop.

## Methods

### nextSlide(times = 1, delay = 0)

Moves to the next slide. Arguments:

- `times`: Number of transitions.
- `delay`: Delay between transitions.

### prevSlide(times = 1, delay = 0)

Moves to the previous slide. Arguments:

- `times`: Number of transitions.
- `delay`: Delay between transitions.

### handleSwipeStart(e)

Handles the start of a swipe on mobile devices.

### handleSwipeEnd(e)

Handles the end of a swipe on mobile devices. Determines the swipe direction and calls the corresponding transition method.

### getSlideStyle(index)

Returns styles for a slide depending on its position. The central slide is visually highlighted.

### getSlideClass(index)

Returns classes for a slide depending on its position. The central slide receives the `center` class.

### getSlideClassMobile(index)

Returns classes for a slide on mobile devices.

### renderDots()

Displays indicators (dots) for the mobile version, showing the current slide.

## Slide Component

A component for displaying each slide.

### Props

- `slide`: An object containing slide data (category, title, year, image, price).
- `className`: Classes for the slide.
- `style`: Styles for the slide.
- `isCenter`: A flag indicating whether the slide is central.

### Structure

- `.slide-background`: The slide's background image.
- `.slide-content`: The slide's content (category, title, year, price).

## CSS

### Main Styles

- **.slider-container**: The container for the slider.
- **.slider-wrapper**: The wrapper for the slider.
- **.slider**: The main slide area.
- **.nav**: Navigation buttons.
- **.slide**: Styles for a slide.
- **.slide.center**: Styles for the central slide.
- **.slide-background**: The background image of a slide.
- **.slide-content**: The slide's content.
- **.loading-screen**: The loading screen.
- **.slide-dots**: The container for indicators.
- **.dot**: The slide indicator.

### Responsive Styles

Media queries are used to adjust the width, height, and styles of slides for mobile devices. The central slide on mobile devices also receives an additional style `opacity: 1`.

