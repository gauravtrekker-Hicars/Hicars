import InfoPage from '../../src/components/InfoPage';

const cards = [
  {
    title: 'Check the driver profile',
    text: 'Review ratings, route details, and verification signals before confirming any shared ride.',
  },
  {
    title: 'Share trip details',
    text: 'Let someone know your route, pickup time, and expected arrival before you travel.',
  },
  {
    title: 'Stay alert on the road',
    text: 'Keep your phone charged, follow in-app updates, and use trusted pickup points whenever possible.',
  },
];

export default function Page() {
  return (
    <InfoPage
      badge="Safety Tips"
      title="Simple habits that make every shared ride safer."
      description="Use these practical safety tips to travel with more confidence whether you are booking, driving, or riding along."
      cards={cards}
      ctaHref="/safety"
      ctaLabel="View Safety Page"
    />
  );
}