
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ROOT_CAUSES_DATA } from "@/lib/constants";

interface Cause {
  id: string;
  title: string;
  details: string;
}

export function CausesSection() {
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (cause: Cause) => {
    setSelectedCause(cause);
    setIsModalOpen(true);
  };

  return (
    <section id="causes" className="pt-16">
      <h2 className="section-title">Root Causes of IT Burnout</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-neutral-700">Burnout in IT is driven by a complex interplay of factors embedded in work structure, company culture, and the nature of tech itself. Click on each cause to learn more.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROOT_CAUSES_DATA.map((cause) => (
          <Card
            key={cause.id}
            className="card-custom cursor-pointer"
            onClick={() => handleCardClick(cause)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cause)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-teal-custom-700">{cause.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 mt-1">Click to see details</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCause && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-teal-custom-700">{selectedCause.title}</DialogTitle>
               <DialogClose asChild>
                <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </DialogHeader>
            <div className="py-4">
              <DialogDescription className="text-neutral-700 space-y-3 whitespace-pre-line">
                {selectedCause.details.split('. ').join('.\n\n')}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
