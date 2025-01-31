export const dynamic = 'force-dynamic';

import ProjectCard from '../../../components/ProjectCard';

export default async function CategoryPage(context) {
  const params = await context.params; // Await params object to access properties
  const category = params?.category; // Safely access `category`

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/.../${category}`, { cache: 'no-store' });

    if (!response.ok) {
      console.error(`Failed to fetch texts for category: ${response.statusText}`);
      throw new Error('Failed to fetch texts for category');
    }

    const texts = await response.json();

    return (
      <div className="pt-[85px] md:pt-[70px] flex flex-col w-full gap-10">
        <h1 className="text-h4 sm:text-h3 text-center font-sans font-medium capitalize">{category}</h1>
        {texts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {texts.map((text) => {
              // Combine paragraphs into a single string
              const contentArray = text.content || [];
              const contentString = contentArray.join(' ');

              // Extract a preview (e.g., first 3 sentences)
              const previewContent = contentString.split('. ').slice(0, 3).join('. ') + '.';

              return (
                <ProjectCard
                  key={text.id}
                  title={text.title}
                  category={text.category}
                  description={previewContent}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-typo-secondary text-p text-center">
            Brak dostępnej treści w tej kategorii.
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching texts for category:', error);
    return <div>Failed to load texts for this category</div>;
  }
}