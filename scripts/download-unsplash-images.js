const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API Access Key
const UNSPLASH_ACCESS_KEY = '7spH7692NfLGqiO9OTqumqliOacpKLzjaEfIQrbH3-g';

// lib/data.ts에서 cities 데이터 추출
const dataPath = path.join(__dirname, '../lib/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// 정규식으로 도시 정보 추출
const cityPattern = /{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*country:\s*"([^"]+)"/g;
const cities = [];
let match;

while ((match = cityPattern.exec(dataContent)) !== null) {
    cities.push({
        id: match[1],
        name: match[2],
        country: match[3]
    });
}

console.log(`📍 총 ${cities.length}개 도시를 찾았습니다.`);

// public/cities 디렉토리 생성
const citiesDir = path.join(__dirname, '../public/cities');
if (!fs.existsSync(citiesDir)) {
    fs.mkdirSync(citiesDir, {recursive: true});
}

// Unsplash API로 이미지 검색
function searchUnsplashImage(query) {
    return new Promise((resolve, reject) => {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

        const options = {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                'Accept-Version': 'v1'
            }
        };

        https.get(url, options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData.results && jsonData.results.length > 0) {
                        // regular 크기 이미지 URL 반환 (더 빠른 다운로드)
                        resolve(jsonData.results[0].urls.regular);
                    } else {
                        reject(new Error('No images found'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

// 이미지 다운로드 함수
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            // 리다이렉트 처리
            if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

// 모든 도시 이미지 다운로드
async function downloadAllImages() {
    console.log('\n🚀 Unsplash에서 실제 도시 이미지를 다운로드합니다...\n');

    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const filename = `${city.id}.jpg`;
        const filepath = path.join(citiesDir, filename);

        try {
            // Unsplash에서 이미지 검색
            const searchQuery = `${city.name} ${city.country} cityscape`;
            console.log(`🔍 [${i + 1}/${cities.length}] ${city.name} 검색 중...`);

            const imageUrl = await searchUnsplashImage(searchQuery);

            // 이미지 다운로드
            await downloadImage(imageUrl, filepath);
            console.log(`✅ [${i + 1}/${cities.length}] ${city.name} - 다운로드 완료`);

            // Unsplash API rate limit 고려 (50 requests/hour for demo, 5000/hour for production)
            // 안전하게 1초 대기
            await new Promise(resolve => setTimeout(resolve, 1200));

        } catch (error) {
            console.error(`❌ [${i + 1}/${cities.length}] ${city.name} - 실패: ${error.message}`);

            // 실패 시 일반적인 검색어로 재시도
            try {
                console.log(`🔄 [${i + 1}/${cities.length}] ${city.name} 재시도 중...`);
                const fallbackQuery = `${city.name} city`;
                const imageUrl = await searchUnsplashImage(fallbackQuery);
                await downloadImage(imageUrl, filepath);
                console.log(`✅ [${i + 1}/${cities.length}] ${city.name} - 재시도 성공`);
                await new Promise(resolve => setTimeout(resolve, 1200));
            } catch (retryError) {
                console.error(`❌ [${i + 1}/${cities.length}] ${city.name} - 재시도 실패`);
            }
        }
    }

    console.log('\n✨ 모든 이미지 다운로드 완료!');
    console.log('📸 Unsplash API를 사용하여 실제 도시 이미지를 다운로드했습니다.');
}

// 실행
downloadAllImages().catch(console.error);
