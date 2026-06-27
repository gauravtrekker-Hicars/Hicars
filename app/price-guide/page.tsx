import InfoPage from '../../src/components/InfoPage';

const cards = [
  {
    title: 'What affects price',
    text: 'Seat price depends on route distance, travel duration, demand, and the number of available seats on the trip.',
  },
  {
    title: 'Budget-friendly sharing',
    text: 'Sharing fuel and toll costs keeps rides affordable for both passengers and drivers across India.',
  },
  {
    title: 'Transparent before booking',
    text: 'You can compare route options, see seat counts, and check the estimated travel time before you book.',
  },
];

export default function Page() {
  return (
    <InfoPage
      badge="Price Guide"
      title="Understand how HIcars ride prices are set."
      description="Use this guide to see what shapes ride pricing and how to find affordable shared travel options on every route."
      cards={cards}
      ctaHref="/find-a-ride"
      ctaLabel="Find a Ride"
    />
  );
}