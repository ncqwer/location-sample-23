<template>
	<div class="bg-white rounded-lg py-5">
			<div class="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
					<div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
							<div class="flex items-center justify-center w-full lg:p-12">
									<div class="flex items-center xl:p-10">
											<div class="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
													<h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">点位标注示例</h3>
													<p class="mb-4 text-grey-700">输入以下参数</p>
													<label for="serverURL" class="mb-2 text-sm text-start text-grey-900">服务器地址</label>
													<input
															v-model="fixtures.serverURL"
															id="serverURL"
															placeholder="http://localhost:3000/sse"
															class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
													<label for="appKey" class="mb-2 text-sm text-start text-grey-900">AppKey</label>
													<input
															v-model="fixtures.appKey"
															id="appKey"
															type="password"
															autocomplete
															placeholder="输入高德地图AppKey"
															class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />

													<label for="securityJsCode" class="mb-2 text-sm text-start text-grey-900">SecurityJsCode</label>
													<input
															v-model="fixtures.securityJsCode"
															id="securityJsCode"
															type="password"
															autocomplete
															placeholder="输入高德地图securityJsCode"
															class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />

													<button
															@click="handleClick"
															class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
															开始体验
													</button>
											</div>
									</div>
							</div>
					</div>
			</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';

const fixtures = reactive({
	serverURL: undefined,
	appKey: undefined,
	securityJsCode: undefined,
});

const emit = defineEmits(['fill']);

function handleClick() {
	if (fixtures.appKey && fixtures.securityJsCode && fixtures.serverURL) {
			emit('fill', fixtures);
	}
}
</script>
