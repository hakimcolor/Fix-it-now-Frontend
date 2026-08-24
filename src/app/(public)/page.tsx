import PopularIndustries from './_components/PopularIndustries';
import HowItWorks from './_components/HowItWorks';
import FeaturedServices from './_components/FeaturedServices';
import TopRatedTechnicians from './_components/TopRatedTechnicians';
import WhyChooseFixItNow from './_components/WhyChooseFixItNow';
import BookingProcessTimeline from './_components/BookingProcessTimeline';
import CustomerReviews from './_components/CustomerReviews';
import PlatformStatistics from './_components/PlatformStatistics';
import BecomeTechnician from './_components/BecomeTechnician';
import FAQSection from './_components/FAQSection';
import FinalCTA from './_components/FinalCTA';
import HeroCarousel from './_components/HeroCarousel';
import { getAllServicesss } from './_actions/getAllServices';
import { getAllTechnicians } from '@/app/(dashboard)/_actions/getAllTechnicians';
import { getAllCategories } from './_actions/getAllCategories';

export default async function Home() {
  const [servicesResult, techniciansResult, categoriesResult] =
    await Promise.allSettled([
      getAllServicesss({ query: { limit: '6' } }),
      getAllTechnicians({ limit: 6 }),
      getAllCategories(),
    ]);

  const services =
    servicesResult.status === 'fulfilled'
      ? (servicesResult.value?.data ?? [])
      : [];
  const technicians =
    techniciansResult.status === 'fulfilled'
      ? (techniciansResult.value?.data ?? [])
      : [];
  const categories =
    categoriesResult.status === 'fulfilled'
      ? (categoriesResult.value?.data ?? [])
      : [];

  return (
    <div>
      <HeroCarousel />
      <PopularIndustries categories={categories} />
      <HowItWorks />
      <FeaturedServices services={services} />
      <TopRatedTechnicians technicians={technicians} />
      <WhyChooseFixItNow />
      <BookingProcessTimeline />
      <CustomerReviews />
      <PlatformStatistics
        totalServices={services.length}
        totalTechnicians={technicians.length}
        totalCategories={categories.length}
      />
      <BecomeTechnician />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
