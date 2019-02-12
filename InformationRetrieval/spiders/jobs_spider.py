
import scrapy
class JobsSpider(scrapy.Spider):
    name = "technojobs"
    download_delay = 1
    user_agent = 'University of Amsterdam - Information Retrieval Project  (persenal_email@gmail.com)' 
    httpcache_enabled = False 
    start_urls = [
        'https://www.technojobs.co.uk/jobs-in/london',
		]

    def parse(self, response):
        # follow links to author pages
        for href in response.css("a.view-job-button::attr(href)").getall():
            if href.find("job") > 0:
                yield response.follow(href, self.parse_vacancie)
            else:
                print('Skip this page')
				
        # follow pagination links
        next_page = response.css("[class=paginate-button-next]::attr(href)").get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

			
			
    def parse_vacancie(self, response):
        list_disc = response.css("div.job-listing-body *::text").getall()
        title_obj = response.css('div.job-listing-title::text').get()
        company = response.css("table.job-listing-table td::text")[0].get()
        location =response.css("table.job-listing-table td::text")[2].get()

        yield {
            'title': title_obj,
            'company': company,
            'description': list_disc,
            'location': location,
			'URL': response.request.url,
        }


