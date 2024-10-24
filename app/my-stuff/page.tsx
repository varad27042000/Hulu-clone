import MyStuffGrid from '@/components/MyStuffGrid';

export default function MyStuffPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">My Stuff</h1>
      <MyStuffGrid />
    </div>
  );
}