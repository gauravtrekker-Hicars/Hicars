import InfoPage from '../../src/components/InfoPage';

const cards = [
  {
    title: 'Booking help',
    text: 'Learn how to search rides, choose a route, and confirm your seat in just a few simple steps.',
  },
  {
    title: 'Trip support',
    text: 'If something changes during a journey, our support flow helps you reach the right help quickly.',
  },
  {
    title: 'Account questions',
    text: 'Find help with logins, profile details, and basic account settings for riders and drivers.',
  },
];

export default function Page() {
  return (
    <InfoPage
      badge="Help Center"
      title="Get quick answers to common HIcars questions."
      description="This help center gives you a simple starting point for bookings, accounts, and trip support on HIcars."
      cards={cards}
      ctaHref="/contact-us"
      ctaLabel="Contact Support"
    />
  );
}