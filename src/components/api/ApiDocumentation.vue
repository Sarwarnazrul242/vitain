<template>
  <div class="relative p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 step-card group mb-6">
  <div class="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
  <div class="relative z-10 p-8">
    <h1 class="text-sm font-medium uppercase tracking-wider text-center text-gray-400 mb-4">Vitain Developer API Guide</h1>
    <h2 class="text-4xl md:text-6xl font-bold text-center mb-10">
      <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
        API Documentation
      </span>
    </h2>

    <div class="space-y-8 text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto">
      <section class="space-y-4 mb-12">
        <h3 class="text-lg font-semibold text-white mb-2">
          <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
            🔐 Authentication
          </span>
        </h3>
        <p>Include your API key in the <code>Authorization</code> header as a Bearer token. API keys are required for all POST endpoints. Example:</p>
        <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto"><code>
Authorization: Bearer your_api_key_here
        </code></pre>
        <p>Every request must include a valid API key to authenticate your identity and authorize access. Without a valid key, the API will respond with a <code>401 Unauthorized</code> error. Keep your API key secure and do not share it publicly.</p>
      </section>

      <section class="space-y-4 mb-12">
        <h3 class="text-lg font-semibold text-white mb-2">
          <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
            📚 Using the API
          </span>
        </h3>
        <p>Each request to the API must be a <code>POST</code> request with a JSON payload, and must include your API key in the <code>Authorization</code> header:</p>
        <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto"><code>
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
        </code></pre>
        <p>You can interact with two main routes:</p>
        <hr class="my-6 border-white/10" />
        <h4 class="font-semibold text-white mb-2">🔹 <code>POST /v1/supplement-info</code></h4>
        <p>Use this to retrieve supplement product info, ingredient data, images, and combined product packages.</p>
        <p><strong>📦 Payload Structure:</strong></p>
        <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto"><code>{
  "action": "get_products_info",
  "supplement": "creatine"
}
        </code></pre>
        <p><strong>🛠 Available <code>action</code> types and required fields:</strong></p>
        <ul class="list-disc list-inside text-gray-300 space-y-2">
          <li><code>"get_products_info"</code>: requires <code>"supplement"</code></li>
          <li><code>"get_ingredient_details"</code>: requires <code>"ingredient"</code></li>
          <li><code>"get_product_resources"</code>: requires <code>"product"</code></li>
          <li><code>"get_products_packages"</code>: requires <code>"supplement"</code></li>
          <li><code>"get_multi_products_packages"</code>: requires <code>"list"</code> (an array of supplement names)</li>
        </ul>
        <hr class="my-6 border-white/10" />
        <h4 class="font-semibold text-white mb-2">🔹 <code>POST /chat</code></h4>
        <p>This endpoint interacts with the Vitain assistant to perform chat operations, quiz response evaluation, and thread management.</p>
        <p><strong>📦 Example Payload (recommendation quiz):</strong></p>
        <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto"><code>{
  "action": "list",
  "weight": "180",
  "height": "5'11",
  "gender": "male",
  "age": "26",
  "activeness": "moderate",
  "supplements": "creatine",
  "allergies": "none",
  "goals": "muscle gain"
}
        </code></pre>
        <p><strong>🛠 Other actions:</strong></p>
        <ul class="list-disc list-inside text-gray-300 space-y-2">
          <li><code>"create_thread"</code>: starts a new assistant thread</li>
          <li><code>"send_message"</code>: continues a chat (<code>message</code> required)</li>
          <li><code>"get_summary"</code>: fetches summary from the assistant's last interaction</li>
        </ul>
      </section>

      <section class="space-y-4 mb-12">
        <h3 class="text-lg font-semibold text-white mb-2">
          <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
            🚫 Error Handling
          </span>
        </h3>
        <p>All endpoints return standard HTTP status codes to indicate success or failure:</p>
        <ul class="list-disc list-inside text-gray-300 space-y-2">
          <li><code>200 OK</code> – successful response</li>
          <li><code>400 Bad Request</code> – malformed or missing required fields  
            <br />Example:  
            <pre class="bg-black text-red-400 p-4 rounded overflow-x-auto ml-4"><code>{
  "error": "Missing required field: supplement"
}
            </code></pre>
          </li>
          <li><code>401 Unauthorized</code> – missing or invalid API key</li>
          <li><code>500 Internal Server Error</code> – server encountered an unexpected error</li>
        </ul>
        <p>Always validate the <code>action</code> field and required keys for the endpoint you’re using. Providing invalid or incomplete data will result in descriptive error messages to help you correct your request.</p>
      </section>

      <section class="space-y-4 mb-12 mt-12">
        <h3 class="text-lg font-semibold text-white mb-2">
          <span class="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-transparent bg-clip-text">
            💡 Common Use Cases
          </span>
        </h3>
        <p>Here are typical examples demonstrating how to use the API for various needs:</p>
        <ul class="list-disc list-inside text-gray-300 space-y-2">
          <li>🔍 Look up supplement info:
            <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto ml-4"><code>{
  "action": "get_products_info",
  "supplement": "magnesium"
}
            </code></pre>
          </li>
          <li>🧪 Get clinical info:
            <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto ml-4"><code>{
  "action": "get_ingredient_details",
  "ingredient": "zinc"
}
            </code></pre>
          </li>
          <li>🛒 Fetch product image + purchase:
            <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto ml-4"><code>{
  "action": "get_product_resources",
  "product": "omega 3 softgels"
}
            </code></pre>
          </li>
          <li>📦 Bundle all data:
            <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto ml-4"><code>{
  "action": "get_products_packages",
  "supplement": "ashwagandha"
}
            </code></pre>
          </li>
          <li>🎯 Generate custom quiz-based recommendations:
            <pre class="bg-black text-green-400 p-4 rounded overflow-x-auto ml-4"><code>{
  "action": "list",
  "weight": "...",
  "height": "...",
  "gender": "...",
  "age": "...",
  "activeness": "...",
  "supplements": "...",
  "allergies": "...",
  "goals": "..."
}
            </code></pre>
          </li>
        </ul>
      </section>
    </div>
  </div>
  </div>
</template>

<style>
/* .step-card styles moved to class attribute in template */
</style>