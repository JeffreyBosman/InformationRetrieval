import scrapy

class JobsSpider(scrapy.Spider):
    name = "jobstoday"
    download_delay = 1
    user_agent = 'University of Amsterdam - Information Retrieval Project  (persenal_email@gmail.com)'
    httpcache_enabled = True
    start_urls = [
        'https://www.jobstoday.co.uk/searchjobs/?LocationId=164&radialtown=United+Kingdom&radiallocation=200&countrycode=GB',
    ]

    def parse(self, response):
        # follow links to author pages
        for href in response.css("h3.lister__header ::attr(href)").getall():
            yield response.follow(href, self.parse_vacancie)


        # follow pagination links
        next_page = response.css("li.paginator__item ::attr(href)").getall()[-2]

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

    def parse_vacancie(self, response):
        list_disc = response.css("div.block.fix-text.job-description ::text").getall()
        title_obj = response.css("h1 ::text").get()
        company =  response.css("div.cf.margin-bottom-5.job-detail-description__recruiter ::text").getall()
        location = response.css("div.cf.margin-bottom-5.job-detail-description__location ::text").getall()
        salary = response.css("div.cf.margin-bottom-5.job-detail-description__salary ::text").getall()
        date_listed =  response.css("div.cf.margin-bottom-5.job-detail-description__posted-date ::text").getall()

        yield {
            'title': title_obj,
            'company': company,
            'description': list_disc,
            'location': location,
            'salary': salary,
            'date_listed': date_listed,
            'URL': response.request.url,
        }