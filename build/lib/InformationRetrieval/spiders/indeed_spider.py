import scrapy


class JobsSpider(scrapy.Spider):
    name = "indeed"
    download_delay = 1
    user_agent = 'University of Amsterdam - Information Retrieval Project  (persenal_email@gmail.com)' 
    httpcache_enabled = False 
    start_urls = [
        'https://www.indeed.co.uk/jobs-in-England',
    ]

    def parse(self, response):
        # follow links to author pages
        for href in response.css(".jobsearch-SerpJobCard a::attr(href)"):
            if href:
                yield response.follow(href, self.parse_vacancie)
            else:
                print('Skip this page')

        # follow pagination links
        next_page = response.css("div.pagination a::attr(href)")[-1]
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)
        else:
            print('Crawler stop')

    def parse_vacancie(self, response):
        title_obj = response.css('div.jobsearch-DesktopStickyContainer h3::text').get()
        list_disc = response.css("div.jobsearch-JobComponent-description *::text").getall()
        company = response.css("div.icl-u-lg-mr--sm *::text").get()
        location = response.css("div.jobsearch-InlineCompanyRating.icl-u-xs-mt--xs.jobsearch-DesktopStickyContainer-companyrating ::text").getall()
        date_listed = response.css("div.jobsearch-JobMetadataFooter ::text").getall()
        salary = "Not available"
        if title_obj:
            yield {
                'title': title_obj,
                'company':company,
                'location':location,
                'description': list_disc,
                'salary': salary,
                'date_listed': date_listed,
                'URL': response.request.url
            }
        else:
            print('Invalid URL',str(response.request.url))
