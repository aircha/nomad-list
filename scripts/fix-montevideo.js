const https = require('https');
const fs = require('fs');
const path = require('path');

const UNSPLASH_ACCESS_KEY = '7spH7692NfLGqiO9OTqumqliOacpKLzjaEfIQrbH3-g';
const citiesDir = path.join(__dirname, '../public/cities');

function searchUnsplashImage(query, page = 1) {
    return new Promise((resolve, reject) => {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&page=${page}&orientation=landscape`;

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

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
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

async function fixMontevideo() {
    console.log('🔄 Montevideo 이미지를 다시 다운로드합니다...\n');

    const filepath = path.join(citiesDir, 'montevideo-uruguay.jpg');

    try {
        // 2번째 검색 결과 사용
        console.log('🔍 Montevideo 검색 중 (다른 이미지 찾는 중)...');
        const imageUrl = await searchUnsplashImage('Montevideo Uruguay cityscape buildings', 2);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        await downloadImage(imageUrl, filepath);
        console.log('✅ Montevideo - 다운로드 완료');
    } catch (error) {
        console.error(`❌ Montevideo - 실패: ${error.message}`);
    }
}

fixMontevideo().catch(console.error);
