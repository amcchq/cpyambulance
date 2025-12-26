import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import blogPosts from '../data/blogData';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (post) {
            document.title = `${post.title} | CPY Ambulance Blog`;
            // Add meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', post.metaDescription);
            }
        }
        window.scrollTo(0, 0);
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-navy-900 mb-4">Article Not Found</h1>
                    <p className="text-slate-600 mb-6">The article you're looking for doesn't exist.</p>
                    <Link to="/blog" className="btn-primary">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const relatedPosts = blogPosts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 2);

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Emergency Tips':
                return 'bg-red-100 text-red-700';
            case 'First Aid':
                return 'bg-green-100 text-green-700';
            case 'Health Awareness':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Image */}
            <div className="relative h-72 md:h-96 lg:h-[28rem] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/blog')}
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                </button>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                {/* Article Header */}
                <div className="bg-cream-50 rounded-2xl shadow-xl p-6 md:p-10 mb-8">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${getCategoryStyles(post.category)}`}>
                        {post.category}
                    </span>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                            </div>
                            <span className="font-medium text-navy-700">{post.author}</span>
                        </div>
                        <span className="text-slate-300">|</span>
                        <span>{formatDate(post.date)}</span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime}
                        </span>
                    </div>
                </div>

                {/* Article Body */}
                <div className="bg-cream-50 rounded-2xl shadow-lg p-6 md:p-10 mb-8">
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary-600 prose-strong:text-navy-800 prose-ul:text-slate-600 prose-li:marker:text-primary-500"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                                .replace(/## /g, '<h2 class="text-2xl mt-8 mb-4">')
                                .replace(/### /g, '<h3 class="text-xl mt-6 mb-3">')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n\n/g, '</p><p class="mb-4">')
                                .replace(/❌/g, '<span class="text-red-500">❌</span>')
                                .replace(/✅/g, '<span class="text-green-500">✅</span>')
                                .replace(/📍|📋|🚨|📱/g, (match) => `<span class="text-xl">${match}</span>`)
                        }}
                    />
                </div>

                {/* Share Buttons */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 mb-8">
                    <p className="text-sm font-semibold text-navy-700 mb-3">Share this article:</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - Read here: ' + window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                            Twitter
                        </a>
                    </div>
                </div>

                {/* Emergency CTA */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-center mb-12">
                    <h3 className="text-2xl font-bold text-white mb-2">Need Emergency Help?</h3>
                    <p className="text-white/90 mb-6">Our ambulances are available 24/7 across Bihar</p>
                    <a
                        href="tel:+919942000266"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-cream-50 text-primary-600 rounded-xl font-bold hover:bg-cream-200 transition-all"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        Call: +91-9942000266
                    </a>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-navy-900 mb-6">Related Articles</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedPosts.map((relPost) => (
                                <Link
                                    key={relPost.id}
                                    to={`/blog/${relPost.slug}`}
                                    className="group flex gap-4 bg-cream-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-cream-200"
                                >
                                    <img
                                        src={relPost.image}
                                        alt={relPost.title}
                                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    />
                                    <div>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${getCategoryStyles(relPost.category)}`}>
                                            {relPost.category}
                                        </span>
                                        <h4 className="font-bold text-navy-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {relPost.title}
                                        </h4>
                                        <span className="text-xs text-slate-500">{relPost.readTime}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default BlogPost;
