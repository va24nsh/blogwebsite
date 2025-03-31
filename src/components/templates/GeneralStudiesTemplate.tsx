'use client';

import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import SidebarNavigation from '@/components/navigation/SidebarNavigation';
import SearchBar from '@/components/Navbar/SearchBar';

interface GeneralStudiesContent {
  title: string;
  content: string;
  image?: string;
}

export const GeneralStudiesTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, id } = page;
  
  // Parse the content properly based on the format it's stored in
  let parsedContent: GeneralStudiesContent;
  try {
    // Try to parse as JSON if it's a string
    if (typeof page.content === 'string') {
      parsedContent = JSON.parse(page.content);
    } else {
      // If it's already an object, use it directly
      parsedContent = page.content as unknown as GeneralStudiesContent;
    }
  } catch (error) {
    console.error('Error parsing content:', error);
    // Fallback to empty content
    parsedContent = { title: title, content: '', image: undefined };
  }
  
  // Default image if none is provided
  const pageImage = parsedContent.image || '/images/default-general-studies.jpg';
  
  console.log('Parsed content:', parsedContent);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Image and Content */}
          <div className="lg:col-span-8">
            {/* Main Topic Image */}
            <Card className="border-0 shadow-xl bg-white/90 overflow-hidden mb-10 transform transition-all hover:scale-[1.02]">
              <div className="relative w-full h-72 md:h-96">
                <Image 
                  src={pageImage} 
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Topics Section */}
            {page.children && page.children.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-b-2 border-blue-500 pb-2 inline-block">
                  Related Topics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {page.children.map((child: any) => {
                    let childContent;
                    try {
                      if (typeof child.content === 'string') {
                        childContent = JSON.parse(child.content);
                      } else {
                        childContent = child.content || {};
                      }
                    } catch (error) {
                      console.error('Error parsing child content:', error);
                      childContent = {};
                    }
                    
                    const childImage = childContent.image || '/images/default-subtopic.jpg';
                    
                    return (
                      <Link 
                        href={`/${child.slug}`} 
                        key={child.id}
                        className="group transform transition-all hover:-translate-y-1"
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full bg-white/90">
                          <div className="relative w-full h-48">
                            <Image 
                              src={childImage} 
                              alt={child.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                              <div className="p-6">
                                <h3 className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">
                                  {child.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Main Content Section */}
            <Card className="border-0 shadow-xl bg-white/90">
              <CardContent className="p-10">
                <div 
                  className="prose prose-lg max-w-none
                    prose-h1:text-gray-900 prose-h1:text-center prose-h1:font-bold prose-h1:border-b-2 prose-h1:border-yellow-400 prose-h1:pb-2 prose-h1:mb-6
                    prose-h2:text-gray-900 prose-h2:text-center prose-h2:font-bold prose-h2:border-b-2 prose-h2:border-yellow-400 prose-h2:pb-2 prose-h2:mb-6
                    prose-h3:text-gray-900 prose-h3:text-center prose-h3:font-bold prose-h3:pb-2 prose-h3:mb-6
                    prose-h4:text-gray-900 prose-h4:text-center prose-h4:font-bold prose-h4:pb-2 prose-h4:mb-6
                    prose-h5:text-gray-900 prose-h5:text-center prose-h5:font-bold prose-h5:pb-2 prose-h5:mb-6
                    prose-h6:text-gray-900 prose-h6:text-center prose-h6:font-bold prose-h6:pb-2 prose-h6:mb-6
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg prose-img:shadow-lg prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: parsedContent.content || '' }} 
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar Navigation */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              {/* Add SearchBar */}
              <Card className="border-0 shadow-xl bg-white/90 max-w-xs mx-auto lg:mx-0 mb-6">
                <CardContent className="p-6">
                  <SearchBar />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 max-w-xs mx-auto lg:mx-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center border-b-2 border-blue-500 pb-2">
                    Navigation
                  </h2>
                  <SidebarNavigation 
                    currentPageId={id.toString()}
                    basePath={page.slug.split('/')[0]}
                    hideParent={true}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralStudiesTemplate;