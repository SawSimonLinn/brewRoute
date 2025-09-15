'use server';

/**
 * @fileOverview A flow for summarizing customer reviews of a cafe.
 *
 * - summarizeCafeReviews - A function that takes a list of reviews and returns a summary.
 * - SummarizeCafeReviewsInput - The input type for the summarizeCafeReviews function.
 * - SummarizeCafeReviewsOutput - The return type for the summarizeCafeReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCafeReviewsInputSchema = z.object({
  reviews: z.array(
    z.string().describe('A customer review of the cafe.')
  ).describe('A list of customer reviews to summarize.'),
});
export type SummarizeCafeReviewsInput = z.infer<typeof SummarizeCafeReviewsInputSchema>;

const SummarizeCafeReviewsOutputSchema = z.object({
  summary: z.string().describe('A short summary of the customer reviews.'),
});
export type SummarizeCafeReviewsOutput = z.infer<typeof SummarizeCafeReviewsOutputSchema>;

export async function summarizeCafeReviews(input: SummarizeCafeReviewsInput): Promise<SummarizeCafeReviewsOutput> {
  return summarizeCafeReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCafeReviewsPrompt',
  input: {schema: SummarizeCafeReviewsInputSchema},
  output: {schema: SummarizeCafeReviewsOutputSchema},
  prompt: `You are a helpful assistant that summarizes customer reviews of a cafe.

  Summarize the following reviews into a single, short sentence that captures the overall sentiment:

  Reviews:
  {{#each reviews}}- {{{this}}}\n{{/each}}
  `,
});

const summarizeCafeReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeCafeReviewsFlow',
    inputSchema: SummarizeCafeReviewsInputSchema,
    outputSchema: SummarizeCafeReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
