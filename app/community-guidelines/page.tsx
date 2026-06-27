import InfoPage from '../../src/components/InfoPage';

const cards = [
  {
    title: 'Be respectful',
    text: 'Keep messages, pickup coordination, and ride behavior polite and considerate for everyone involved.',
  },
  {
    title: 'Be accurate',
    text: 'Share correct route details, seat counts, and timing so other community members can plan properly.',
  },
  {
    title: 'Report issues',
    text: 'If a trip feels unsafe or inappropriate, report it through the support channels as soon as possible.',
  },
];

export default function Page() {
  return (
    <InfoPage
      badge="Community Guidelines"
      title="Shared travel works best when everyone follows the same basics."
      description="These guidelines help HIcars stay trusted, friendly, and useful for riders and drivers across India."
      cards={cards}
      ctaHref="/contact-us"
      ctaLabel="Report a Concern"
    />
  );
}