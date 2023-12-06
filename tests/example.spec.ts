import { test, expect } from '@playwright/test';

const mockMazeData = {
  title: "playwight e2e test title",
  name: "playwight e2e test name",
  mazeSize: {
    "row": 10,
    "col": 10
  },
}

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/maze-maker/);
});

test('test making maze', async ({ page }) => {
  const mazeTitleInputElementSelector = '#body > div > div.maze-form > div:nth-child(1) > input'
  const mazeNameInputElementSelector = '#body > div > div.maze-form > div:nth-child(2) > input'
  const mazeColInputElementSelecttor = '#body > div > div.maze-form > div:nth-child(3) > div:nth-child(1) > input'
  const mazeRowInputElementSelecttor = '#body > div > div.maze-form > div:nth-child(3) > div:nth-child(2) > input'
  const controllerWallButtonElementSelector = '#body > div > div.maker-maze-controller > div:nth-child(2) > button:nth-child(1)'
  const controllerEndPointButtonElementSelector = '#body > div > div.maker-maze-controller > div:nth-child(1) > button:nth-child(2)'
  const controllerSubmitButtonElementSelector = '#body > div > div.maker-maze-controller > button'

  await page.goto('/');
  //root 페이지 진입 확인
  await expect(page.getByRole('heading', { name: 'MazeMaker' })).toBeVisible();
  //Make 버튼 클릭
  await page.getByRole('link', { name: 'Make' }).click()
  //Make 페이지 진입 확인
  await expect(page.getByRole('heading', { name: 'Maker' })).toBeVisible();

  // maze title 변경
  await page.click(mazeTitleInputElementSelector)
  await page.keyboard.type(mockMazeData.title);

  // maze name 변경
  await page.click(mazeNameInputElementSelector)
  await page.keyboard.type(mockMazeData.name);

  // maze col 변경
  await page.click(mazeColInputElementSelecttor)
  await page.keyboard.press('Backspace');
  await page.keyboard.type(String(mockMazeData.mazeSize.col))

  // maze row 변경
  await page.click(mazeRowInputElementSelecttor)
  await page.keyboard.press('Backspace');
  await page.keyboard.type(String(mockMazeData.mazeSize.row))

  //시작 지점 변경
  await page.click('#body > div > div.maze-maker > div > div:nth-child(1) > div:nth-child(2)');

  // controller 벽 선택
  await page.click(controllerWallButtonElementSelector);
  await page.click('#body > div > div.maze-maker > div > div:nth-child(1) > div:nth-child(3)');
  await page.click('#body > div > div.maze-maker > div > div:nth-child(3) > div:nth-child(1)');

  // controller 종료 지점 선택
  await page.click(controllerEndPointButtonElementSelector);
  await page.click('#body > div > div.maze-maker > div > div:nth-child(5) > div:nth-child(4)');

  // 제출버튼 클릭
  await page.click(controllerSubmitButtonElementSelector);

  // 메인 페이지 진입 확인
  await expect(page).toHaveTitle(/maze-maker/);
  await expect(page.getByRole('heading', { name: 'MazeMaker' })).toBeVisible();


});

test('test play maze', async ({ page }) => {
  await page.goto('/');

  //root 페이지 진입 확인
  await expect(page.getByRole('heading', { name: 'MazeMaker' })).toBeVisible();

  // play 버튼 클릭
  await page.getByRole('link', { name: 'Play' }).click()

  // maplist 페이지 진입 확인  
  await expect(page).toHaveTitle(/maze-maker-maplist/);
  await expect(page.getByRole('heading', { name: 'Maze List' })).toBeVisible();

  // 마지막 map 진입
  await page.click(`#body > div > ul > li:last-child > a`)

  // map 확인
  await expect(page).toHaveTitle(`${mockMazeData.title}-${mockMazeData.name}`);
  await expect(page.getByRole('heading', { name: mockMazeData.title })).toBeVisible();
  // await expect(page.getAttribute).toHaveCount(mockMazeData.mazeSize.col * mockMazeData.mazeSize.row)

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');

  await expect(page.getByText(`score: -6`)).toBeVisible();
  //골인
  await page.keyboard.press('ArrowDown');
  await expect(page.getByText(`score: 0`)).toBeVisible();

  //정답보기 버튼 클릭
  await page.getByRole('button', { name: "정답보기" }).click()
})
