'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from "@heroui/react";
import { Flex, Text } from '@gravity-ui/uikit';

export default function FeaturedSection() {
  return (
    <section className="w-full bg-[#e2eae2]/40 py-16 px-4 border-t border-b border-[#4A5D4E]/10">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* GravityUI Flex used for seamless responsive column tracking */}
        <Flex 
          direction={{mobile: 'column', tablet: 'row'}} 
          gap="6" 
          wrap="wrap" 
          className="justify-between items-stretch"
        >
          
          {/* CARD 1: FITNESS CLASSES */}
          <Card className="flex-1 min-w-[280px] backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <Card.Header className="p-6 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#87A96B]/20 flex items-center justify-center text-lg shrink-0">
                  🏋️‍♂️
                </div>
                <div>
                  <Card.Title>
                    <Text variant="subheader-2" className="text-[#2d3a30] font-bold">
                      500+ Fitness Classes
                    </Text>
                  </Card.Title>
                  <Card.Description>
                    <Text variant="body-1" className="text-[#556459] mt-0.5">
                      HIIT, strength, and mindful yoga.
                    </Text>
                  </Card.Description>
                </div>
              </div>
            </Card.Header>
            
            <Card.Content className="px-6 py-2 flex-grow">
              <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-inner border border-[#4A5D4E]/5">
                <Image 
                  src="/test.png" 
                  alt="Fitness Classes Grid"
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Card.Content>

            <Card.Footer className="px-6 pb-6 pt-2 text-xs text-[#728476] font-medium">
              Live updates every hour
            </Card.Footer>
          </Card>

          {/* CARD 2: EXPERT TRAINERS */}
          <Card className="flex-1 min-w-[280px] backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <Card.Header className="p-6 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4A5D4E]/20 flex items-center justify-center text-lg shrink-0">
                  🤝
                </div>
                <div>
                  <Card.Title>
                    <Text variant="subheader-2" className="text-[#2d3a30] font-bold">
                      Expert Trainers
                    </Text>
                  </Card.Title>
                  <Card.Description>
                    <Text variant="body-1" className="text-[#556459] mt-0.5">
                      Certified professionals guiding you.
                    </Text>
                  </Card.Description>
                </div>
              </div>
            </Card.Header>
            
            <Card.Content className="px-6 py-2 flex-grow">
              <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-inner border border-[#4A5D4E]/5">
                <Image 
                  src="/test.png" 
                  alt="Personal Training Session"
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Card.Content>

            <Card.Footer className="px-6 pb-6 pt-2 text-xs text-[#728476] font-medium">
              1-on-1 private scheduling open
            </Card.Footer>
          </Card>

          {/* CARD 3: MODERATED FORUM */}
          <Card className="flex-1 min-w-[280px] backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <Card.Header className="p-6 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-lg shrink-0 border border-[#d7dfc6]/60">
                  🛡️
                </div>
                <div>
                  <Card.Title>
                    <Text variant="subheader-2" className="text-[#2d3a30] font-bold">
                      Moderated Forum
                    </Text>
                  </Card.Title>
                  <Card.Description>
                    <Text variant="body-1" className="text-[#556459] mt-0.5">
                      Safe spaces overseen by team rules.
                    </Text>
                  </Card.Description>
                </div>
              </div>
            </Card.Header>
            
            <Card.Content className="px-6 py-2 flex-grow">
              <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-inner border border-[#4A5D4E]/5">
                <Image 
                  src="/test.png" 
                  alt="Community Interaction Dashboard"
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Card.Content>

            <Card.Footer className="px-6 pb-6 pt-2 text-xs text-[#728476] font-medium">
              Strict safe space framework
            </Card.Footer>
          </Card>

        </Flex>
      </div>
    </section>
  );
}