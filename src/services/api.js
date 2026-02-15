/**
 * Mock API service for Hyperlocal Ads
 * Simulates API responses matching the form data structure
 */

// Mock delay to simulate network request
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock API response schema matching form submission
 * @param {Object} formData - Form submission data
 * @returns {Promise<Object>} Mock API response
 */
export const submitCampaign = async (formData) => {
  // Simulate network delay
  await delay(1500)

  // Generate mock campaign ID
  const campaignId = `CAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Generate ad content based on form data
  const adContent = generateAdContent(formData)

  // Mock API response matching the expected schema
  return {
    success: true,
    data: {
      campaign: {
        id: campaignId,
        status: 'active',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      },
      product: {
        name: formData.productName,
        category: formData.productCategory,
        categoryLabel: getCategoryLabel(formData.productCategory),
      },
      business: {
        type: formData.businessType,
        typeLabel: getBusinessTypeLabel(formData.businessType),
        city: formData.selectedCity,
        language: formData.selectedLanguage,
        region: getRegionFromCity(formData.selectedCity),
      },
      offer: formData.offer || null,
      adContent: {
        headline: adContent.headline,
        description: adContent.description,
        callToAction: adContent.callToAction,
        keywords: adContent.keywords,
        targetAudience: adContent.targetAudience,
      },
      analytics: {
        estimatedReach: Math.floor(Math.random() * 50000) + 1000,
        estimatedImpressions: Math.floor(Math.random() * 200000) + 5000,
        estimatedClicks: Math.floor(Math.random() * 5000) + 100,
        estimatedConversions: Math.floor(Math.random() * 500) + 10,
      },
      settings: {
        targeting: {
          radius: 5, // km
          ageRange: { min: 18, max: 65 },
          interests: getInterestsByCategory(formData.productCategory),
        },
        budget: {
          daily: 500, // INR
          total: 15000, // INR
        },
      },
    },
    message: 'Campaign created successfully',
    timestamp: new Date().toISOString(),
  }
}

/**
 * Generate ad content based on form data
 */
function generateAdContent(formData) {
  const { productName, productCategory, selectedCity, selectedLanguage, offer, businessType } = formData

  const headlines = {
    'food-beverage': [
      `Delicious ${productName} in ${selectedCity} - Order Now!`,
      `Taste the Best ${productName} - Fresh & Local`,
      `${productName} Delivered to Your Doorstep in ${selectedCity}`,
    ],
    fashion: [
      `Latest ${productName} Collection - Shop Now in ${selectedCity}`,
      `Trendy ${productName} - Best Prices in ${selectedCity}`,
      `Style Up with ${productName} - Exclusive Collection`,
    ],
    services: [
      `Professional ${productName} Services in ${selectedCity}`,
      `Expert ${productName} - Trusted by Locals`,
      `Quality ${productName} Services - Book Now`,
    ],
    'health-beauty': [
      `Premium ${productName} - Your Beauty Partner`,
      `Transform with ${productName} - Available in ${selectedCity}`,
      `Natural ${productName} - Healthy Choice`,
    ],
    electronics: [
      `Latest ${productName} - Best Deals in ${selectedCity}`,
      `Tech Upgrade: ${productName} - Shop Now`,
      `Premium ${productName} - Quality Guaranteed`,
    ],
    other: [
      `${productName} - Available Now in ${selectedCity}`,
      `Quality ${productName} - Shop Local`,
      `Best ${productName} Deals - Limited Time`,
    ],
  }

  const descriptions = {
    'food-beverage': `Experience authentic flavors with our ${productName}. Made fresh daily and delivered to your neighborhood in ${selectedCity}. ${offer || 'Special offers available!'}`,
    fashion: `Discover the latest trends with our ${productName} collection. Perfect for fashion-forward individuals in ${selectedCity}. ${offer || 'Great deals await!'}`,
    services: `Professional ${productName} services right here in ${selectedCity}. Trusted by hundreds of satisfied customers. ${offer || 'Book your appointment today!'}`,
    'health-beauty': `Enhance your beauty routine with our premium ${productName}. Natural ingredients, proven results. Available in ${selectedCity}. ${offer || 'Special pricing available!'}`,
    electronics: `Upgrade your tech with the latest ${productName}. Best prices and genuine products in ${selectedCity}. ${offer || 'Limited time offers!'}`,
    other: `Quality ${productName} available now in ${selectedCity}. ${offer || 'Check out our special offers!'}`,
  }

  const categoryHeadlines = headlines[productCategory] || headlines.other
  const categoryDescriptions = descriptions[productCategory] || descriptions.other

  return {
    headline: categoryHeadlines[Math.floor(Math.random() * categoryHeadlines.length)],
    description: categoryDescriptions,
    callToAction: businessType === 'online' 
      ? 'Shop Now' 
      : businessType === 'hybrid' 
      ? 'Visit Store or Order Online' 
      : 'Visit Our Store',
    keywords: [
      productName.toLowerCase(),
      selectedCity.toLowerCase(),
      productCategory,
      ...getKeywordsByCategory(productCategory),
    ],
    targetAudience: {
      location: selectedCity,
      language: selectedLanguage,
      interests: getInterestsByCategory(productCategory),
    },
  }
}

/**
 * Get category label
 */
function getCategoryLabel(category) {
  const labels = {
    'food-beverage': 'Food & Beverages',
    fashion: 'Fashion & Accessories',
    services: 'Local Services',
    'health-beauty': 'Health & Beauty',
    electronics: 'Electronics & Gadgets',
    other: 'Other',
  }
  return labels[category] || category
}

/**
 * Get business type label
 */
function getBusinessTypeLabel(type) {
  const labels = {
    retail: 'Retail Store',
    online: 'Online Only',
    hybrid: 'Online + Store',
  }
  return labels[type] || type
}

/**
 * Get region from city (mock function)
 */
function getRegionFromCity(city) {
  // Simple mock - in real app, this would be a lookup
  const regions = {
    Mumbai: 'Maharashtra',
    Delhi: 'Delhi',
    Bangalore: 'Karnataka',
    Chennai: 'Tamil Nadu',
    Kolkata: 'West Bengal',
    Hyderabad: 'Telangana',
  }
  return regions[city] || 'India'
}

/**
 * Get interests by category
 */
function getInterestsByCategory(category) {
  const interests = {
    'food-beverage': ['Food & Dining', 'Local Cuisine', 'Restaurants'],
    fashion: ['Fashion', 'Shopping', 'Style & Trends'],
    services: ['Local Services', 'Professional Services', 'Home Services'],
    'health-beauty': ['Beauty', 'Health & Wellness', 'Skincare'],
    electronics: ['Technology', 'Gadgets', 'Electronics'],
    other: ['Shopping', 'Local Business'],
  }
  return interests[category] || ['Shopping']
}

/**
 * Get keywords by category
 */
function getKeywordsByCategory(category) {
  const keywords = {
    'food-beverage': ['food', 'delivery', 'restaurant', 'cuisine'],
    fashion: ['clothing', 'apparel', 'style', 'trends'],
    services: ['service', 'professional', 'local'],
    'health-beauty': ['beauty', 'skincare', 'wellness'],
    electronics: ['tech', 'gadgets', 'devices'],
    other: ['local', 'shop'],
  }
  return keywords[category] || []
}

/**
 * Regenerate campaign content based on user feedback.
 * Keeps the same campaign ID; returns updated adContent only.
 * @param {Object} params
 * @param {string} params.campaignId - Existing campaign ID (preserved)
 * @param {string} params.previousOutputText - Serialized previous ad content for prompt
 * @param {string} params.userFeedback - User's feedback text (or transcribed voice)
 * @param {Object} params.context - Original campaign context
 * @param {Object} params.existingResponse - Full existing API response (to preserve analytics, settings, etc.)
 * @returns {Promise<Object>} Same shape as submitCampaign with updated adContent
 */
export const regenerateCampaign = async ({
  campaignId,
  previousOutputText,
  userFeedback,
  context,
  existingResponse,
}) => {
  await delay(1500)

  const formData = {
    productName: context.productName,
    productCategory: context.productCategory,
    businessType: context.businessType || 'retail',
    selectedCity: context.selectedCity,
    selectedLanguage: context.selectedLanguage,
    offer: context.offer,
  }

  // Generate new ad content; mock applies simple feedback-aware tweaks
  const adContent = generateAdContentFromFeedback(
    formData,
    previousOutputText,
    userFeedback
  )

  return {
    success: true,
    data: {
      ...existingResponse.data,
      campaign: {
        ...existingResponse.data.campaign,
        id: campaignId,
      },
      adContent: {
        headline: adContent.headline,
        description: adContent.description,
        callToAction: adContent.callToAction,
        keywords: adContent.keywords,
        targetAudience: adContent.targetAudience,
      },
    },
    message: 'Campaign content regenerated successfully',
    timestamp: new Date().toISOString(),
  }
}

/**
 * Build the regeneration prompt per spec for use with a real AI backend.
 */
function buildRegenerationPrompt(previousOutputText, userFeedback, context) {
  const platforms = [].concat(context.selectedPlatforms || []).join(', ') || 'All'
  return `---
You previously generated this hyperlocal ad campaign:

<<<PREVIOUS_OUTPUT>>>
${previousOutputText}
<<<PREVIOUS_OUTPUT>>>

Campaign context:
- Product: ${context.productName}
- City: ${context.selectedCity}
- Language: ${context.selectedLanguage}
- Category: ${context.productCategory}
- Platforms: ${platforms}

User feedback:
<<<USER_FEEDBACK>>>
${userFeedback || '(No specific feedback)'}
<<<USER_FEEDBACK>>>

Task:
Regenerate the ad content by strictly applying the feedback.
Do not change information that was not requested.
Keep it suitable for local MSME advertising.
---`
}

/**
 * Generate ad content that incorporates user feedback (mock implementation).
 * In production this would call an LLM with buildRegenerationPrompt().
 */
function generateAdContentFromFeedback(formData, _previousOutputText, userFeedback) {
  const base = generateAdContent(formData)
  const feedback = (userFeedback || '').toLowerCase().trim()
  if (!feedback) return base

  let headline = base.headline
  let description = base.description
  let cta = base.callToAction

  if (feedback.includes('shorter') || feedback.includes('brief')) {
    headline = headline.split(' - ')[0] || headline.slice(0, 50)
    description = description.slice(0, 120) + (description.length > 120 ? '...' : '')
  }
  if (feedback.includes('longer') || feedback.includes('more detail')) {
    description = description + ' Visit us today for the best experience.'
  }
  if (feedback.includes('formal') || feedback.includes('professional')) {
    headline = headline.replace(/!$/, '.')
    description = 'We are pleased to offer ' + description.toLowerCase()
  }
  if (feedback.includes('casual') || feedback.includes('friendly')) {
    headline = headline + ' 🙂'
    description = 'Hey! ' + description
  }
  if (feedback.includes('offer') || feedback.includes('discount')) {
    description = description + ' Special offer inside!'
  }

  return {
    ...base,
    headline,
    description,
    callToAction: cta,
  }
}

/**
 * Mock function to get campaign status
 */
export const getCampaignStatus = async (campaignId) => {
  await delay(500)
  return {
    success: true,
    data: {
      campaignId,
      status: 'active',
      views: Math.floor(Math.random() * 10000),
      clicks: Math.floor(Math.random() * 500),
      conversions: Math.floor(Math.random() * 50),
      lastUpdated: new Date().toISOString(),
    },
  }
}

/**
 * Mock function to get analytics
 */
export const getAnalytics = async (campaignId) => {
  await delay(800)
  return {
    success: true,
    data: {
      campaignId,
      period: 'last_30_days',
      metrics: {
        impressions: Math.floor(Math.random() * 50000) + 10000,
        clicks: Math.floor(Math.random() * 2000) + 100,
        conversions: Math.floor(Math.random() * 200) + 20,
        spend: Math.floor(Math.random() * 10000) + 2000,
        revenue: Math.floor(Math.random() * 50000) + 10000,
      },
      demographics: {
        ageGroups: {
          '18-24': Math.floor(Math.random() * 30) + 10,
          '25-34': Math.floor(Math.random() * 40) + 20,
          '35-44': Math.floor(Math.random() * 30) + 15,
          '45-54': Math.floor(Math.random() * 20) + 10,
          '55+': Math.floor(Math.random() * 15) + 5,
        },
        topCities: [
          { city: 'Mumbai', percentage: 25 },
          { city: 'Delhi', percentage: 20 },
          { city: 'Bangalore', percentage: 15 },
        ],
      },
    },
  }
}
