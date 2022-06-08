import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import Image from 'next/image'

// combine list of classes function react
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-10 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight  text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="hidden text-lg leading-7 text-gray-500 dark:text-gray-400 sm:flex">
            Eternally Curious — sometimes by Learning, sometimes by Sharing, sometimes by chasing
            Ambitious Goals.{' '}
          </p>
        </div>
        <ul className="grid grid-cols-1 dark:divide-gray-700 sm:grid-cols-2 sm:gap-x-10 xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <li key={slug} className="py-6 sm:py-12 ">
                <article>
                  <div className="group xl:items-baseline xl:space-y-0 ">
                    {/* <div className="relative mb-3 flex h-80 overflow-hidden rounded-2xl shadow-xl xl:h-96">
                      <Link href={`/blog/${slug}`}>
                        <Image
                          src={images[0]}
                          // layout="fill"
                          alt="Abstract"
                          width={800}
                          height={1000}
                          className="bg-cover bg-center transition duration-500 ease-in-out hover:cursor-pointer group-hover:scale-150"
                        />
                      </Link>
                    </div> */}
                    <div className="xl:col-span-3">
                      <div className="space-y-1">
                        <div className={`flex flex-wrap justify-between`}>
                          <Tag text={tags[0]} />
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 group-hover:text-primary-500 dark:text-gray-400">
                              <time dateTime="YYYY-MMM-DD">{formatDate(date)}</time>
                            </dd>
                          </dl>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 transition duration-500 ease-in-out group-hover:text-primary-500 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                      </div>
                      {/* <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
