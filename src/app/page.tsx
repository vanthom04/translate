'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useCompletion } from '@ai-sdk/react'
import { zodResolver } from '@hookform/resolvers/zod'
import MarkdownPreview from '@uiw/react-markdown-preview'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { schemaTranslateNovel } from '@/schemas'
import { Textarea } from '@/components/ui/textarea'
import { ShareButton } from '@/components/share-button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const TranslatePage = () => {
  const { complete, completion, isLoading } = useCompletion({ api: '/api/completion' })

  const form = useForm<z.infer<typeof schemaTranslateNovel>>({
    resolver: zodResolver(schemaTranslateNovel),
    defaultValues: {
      content: '',
      context: '',
      toLanguage: 'Vietnamese'
    }
  })

  const onSubmit = async (values: z.infer<typeof schemaTranslateNovel>) => {
    const { content, context, toLanguage } = values

    try {
      await complete(content, {
        body: { context, toLanguage }
      })
    } catch (error) {
      const message = (error as Error).message || 'Something went wrong'
      toast.error(message)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] px-4 py-2 hidden md:flex gap-x-2"
        >
          <div className="basis-1/2 flex flex-col gap-y-2">
            <div className="basis-3/5 h-full overflow-y-auto">
              <FormField
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        spellCheck="false"
                        autoComplete="off"
                        disabled={isLoading}
                        placeholder="Enter your content here..."
                        className={cn(
                          'flex-1 resize-none rounded-none !text-[15px] border-neutral-400 focus-visible:border-black dark:border-gray-500 dark:focus-visible:border-neutral-300 dark:text-neutral-100',
                          fieldState.error && 'border-destructive placeholder:text-destructive'
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-2/5 overflow-y-auto">
              <FormField
                name="context"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        spellCheck="false"
                        autoComplete="off"
                        disabled={isLoading}
                        placeholder="Enter your context here... (Optional)"
                        className="flex-1 resize-none rounded-none !text-[15px] border-neutral-400 focus-visible:border-black dark:border-gray-500 dark:focus-visible:border-neutral-300 dark:text-neutral-100"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="basis-1/2 flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              <FormField
                name="toLanguage"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1/2">
                    <Select
                      disabled={isLoading}
                      defaultValue="Vietnamese"
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full !h-10 rounded-none border-neutral-400 dark:border-gray-500">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        <SelectItem className="rounded-none h-10" value="English">
                          English
                        </SelectItem>
                        <SelectItem className="rounded-none h-10" value="Japanese">
                          Japanese
                        </SelectItem>
                        <SelectItem className="rounded-none h-10" value="Vietnamese">
                          Vietnamese
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1/2 h-10 rounded-none cursor-pointer"
              >
                Translate
              </Button>
            </div>
            <div className="flex-1 border border-neutral-400 dark:border-gray-500 relative group overflow-y-auto">
              <MarkdownPreview
                source={completion}
                className="h-full p-2 !text-[15px] !bg-white dark:!bg-[#141416] dark:!text-neutral-100 overflow-y-auto"
              />
              <ShareButton
                content={completion}
                disabled={!completion || isLoading}
              />
            </div>
          </div>
        </form>
      </Form>
      <div className="flex md:hidden items-center justify-center h-screen">
        <p className="p-6 text-sm text-center text-muted-foreground">
          This app is only meant as an experiment and is not responsive. Please use a wider screen.
        </p>
      </div>
    </>
  )
}

export default TranslatePage
