<script setup>
import AMapConfig from './AMapConfig.vue';
import { shallowRef, watchEffect, ref, reactive, toRaw } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

const wrapperRef = ref(null);
const mapInstanceRef = shallowRef(null);

let temp = {
    serverURL: undefined,
    appKey: undefined,
    securityJsCode: undefined,
};
try {
    const str = localStorage.getItem('fixtures');
    if (str) temp = JSON.parse(str);
} catch {
    temp = {
        serverURL: undefined,
        appKey: undefined,
        securityJsCode: undefined,
    };
}

const fixtures = reactive(temp);
const needFillFixtures = ref(!(fixtures.appKey && fixtures.securityJsCode && fixtures.serverURL));
watchEffect(() => {
    if (fixtures.serverURL) {
        const eventSource = new EventSource(fixtures.serverURL);

        eventSource.onopen = () => {
            console.log('SSE connection opened');
        };

        eventSource.onmessage = (event) => {
            const data = event.data;
            console.log('Received message:', data);
            try {
                const { latitude, longitude } = JSON.parse(data);
                const marker = new AMap.Marker({
                    position: [longitude, latitude],
                    offset: new AMap.Pixel(-13, -30),
                });
                marker.setMap(mapInstanceRef.value);
                mapInstanceRef.value.setCenter([longitude, latitude]);
            } catch {}
            // 处理接收到的消息
        };

        eventSource.onerror = (error) => {
            if (eventSource.readyState === EventSource.CLOSED) {
                console.log('SSE connection closed');
            } else {
                console.error('SSE error:', error);
            }
        };
        return () => eventSource.close();
    }
});

watchEffect(() => {
    if (wrapperRef.value && fixtures.appKey && fixtures.securityJsCode) {
        loadAMap(fixtures.appKey, fixtures.securityJsCode);
    }
});



function loadAMap(appKey, securityJsCode, force = false) {
    if (!force && window.AMap) return;
    window._AMapSecurityConfig = {
        securityJsCode: securityJsCode,
    };
    AMapLoader.load({
        key: appKey, //申请好的 Web 端开发者 Key，首次调用 load 时必填
        version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
    })
        .then((AMap) => {
            window.AMap = AMap;
            mapInstanceRef.value = new AMap.Map(wrapperRef.value, {
                resizeEnable: true,
                center: [120.21201, 30.2084],
                zoom: 13,
            }); //"container"为 <div> 容器的 id
        })
        .catch((e) => {
            console.log(e);
        });
}

function handleFill(_fixtures) {
    localStorage.setItem('fixtures', JSON.stringify(toRaw(_fixtures)));
    fixtures.appKey = _fixtures.appKey;
    fixtures.securityJsCode = _fixtures.securityJsCode;
    fixtures.serverURL = _fixtures.serverURL;
    needFillFixtures.value = false;
}
</script>

<template>
    <div class="relative">
        <AMapConfig v-if="needFillFixtures" @fill="handleFill"></AMapConfig>
        <div ref="wrapperRef" class="w-screen h-screen" v-show="!needFillFixtures">
            <div>地图暂未加载</div>
        </div>
    </div>
</template>
