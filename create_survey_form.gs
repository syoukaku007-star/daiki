/**
 * 27新卒 内定承諾者向け 顔合わせ後アンケート
 * 実行方法：
 * 1. https://script.google.com を開く
 * 2. 新しいプロジェクトを作成
 * 3. このコードを貼り付けて保存
 * 4. 「createSurveyForm」を選択して実行
 * 5. 実行ログに表示されるURLがフォームのURL
 */

function createSurveyForm() {

  // ── フォーム作成 ──────────────────────────────────────
  var form = FormApp.create('【27新卒】内定者顔合わせ アンケート');
  form.setDescription(
    '本日はご参加ありがとうございました！\n' +
    'ご回答はすべて今後の企画改善に活用させていただきます。\n' +
    '所要時間：約2〜3分　　※「氏名」以外はすべて任意です。'
  );
  form.setCollectEmail(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    'ご回答ありがとうございました！\n' +
    '次回の顔合わせでまたお会いできるのを楽しみにしています。\n' +
    '何かあればいつでも人事までご連絡ください😊'
  );

  // ── セクション①：基本情報 ────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('基本情報')
    .setHelpText('');

  // Q1: 氏名（必須）
  form.addTextItem()
    .setTitle('お名前')
    .setHelpText('例：山田 太郎')
    .setRequired(true);

  // Q2: 学校名（必須）
  form.addTextItem()
    .setTitle('大学名')
    .setHelpText('例：〇〇大学')
    .setRequired(true);

  // Q3: 参加グループ
  form.addMultipleChoiceItem()
    .setTitle('参加した日程')
    .setChoiceValues([
      '6月23日（月）11:00〜',
      '6月30日（月）15:00〜'
    ])
    .setRequired(true);

  // ── セクション②：今日の満足度 ────────────────────────
  form.addPageBreakItem()
    .setTitle('今日の顔合わせについて')
    .setHelpText('各項目について、あてはまるものを選んでください。');

  // Q4: 楽しかったか（5段階）
  form.addScaleItem()
    .setTitle('今日の顔合わせは楽しめましたか？')
    .setHelpText('1＝あまり楽しめなかった　／　5＝とても楽しめた')
    .setBounds(1, 5)
    .setLabels('あまり楽しめなかった', 'とても楽しめた')
    .setRequired(true);

  // Q5: 同期の解像度が上がったか（5段階）
  form.addScaleItem()
    .setTitle('同期のことをより身近に感じられましたか？')
    .setHelpText('名前・顔・キャラクターなど、参加前より同期のイメージが具体的になったか。\n1＝あまり感じなかった　／　5＝とても感じた')
    .setBounds(1, 5)
    .setLabels('あまり感じなかった', 'とても感じた')
    .setRequired(true);

  // Q6: 入社が楽しみになったか（5段階）
  form.addScaleItem()
    .setTitle('入社が楽しみになりましたか？')
    .setHelpText('1＝あまり変わらなかった　／　5＝とても楽しみになった')
    .setBounds(1, 5)
    .setLabels('あまり変わらなかった', 'とても楽しみになった')
    .setRequired(true);

  // Q7: 不安が解消されたか（5段階）
  form.addScaleItem()
    .setTitle('入社に向けた不安は和らぎましたか？')
    .setHelpText('1＝あまり変わらなかった　／　5＝とても和らいだ')
    .setBounds(1, 5)
    .setLabels('あまり変わらなかった', 'とても和らいだ')
    .setRequired(true);

  // ── セクション③：定性情報（本音の収集） ────────────────
  form.addPageBreakItem()
    .setTitle('もう少し教えてください')
    .setHelpText('すべて任意です。思ったことをそのままお書きください。');

  // Q8: 印象に残った同期（自由記述）
  //     → 人事が「記憶に定着しているか」を確認するため
  form.addTextItem()
    .setTitle('今日一番印象に残った同期のエピソードを教えてください（任意）')
    .setHelpText('例：「〇〇さんが実は料理が得意だと知って驚いた」など。\n次回の企画の参考にします！');

  // Q9: 今でも残っている不安（自由記述）
  //     → 個別フォローの優先度づけに使う
  form.addParagraphTextItem()
    .setTitle('入社に向けて、まだ不安なことや気になっていることがあれば教えてください（任意）')
    .setHelpText('社宅・引越し・業務内容・同期関係など、どんなことでもOKです。\n個別にフォローさせていただく場合があります。');

  // Q10: 次回参加意欲（Yes/No）
  //      → 離脱リスクの早期検知に使う
  form.addMultipleChoiceItem()
    .setTitle('次回の顔合わせにも参加したいと思いましたか？')
    .setChoiceValues([
      'はい、ぜひ参加したい',
      '参加できれば参加したい',
      'まだわからない',
      '正直、あまり参加したくない'
    ])
    .setRequired(true);

  // Q11: 顔合わせの頻度（選択）
  //      → 年間スケジュールの調整に活かす
  form.addMultipleChoiceItem()
    .setTitle('このような顔合わせの頻度はどのくらいが嬉しいですか？（任意）')
    .setChoiceValues([
      '月1回くらいがちょうどいい',
      '2ヶ月に1回くらいがちょうどいい',
      '3ヶ月に1回くらいがちょうどいい',
      '対面でやってほしい'
    ]);

  // Q12: 人事への一言（自由記述）
  //      → 心理的距離を縮める・本音を拾う
  form.addParagraphTextItem()
    .setTitle('人事への一言・感想・要望など、なんでもどうぞ（任意）')
    .setHelpText('良かったこと、もっとこうしてほしいこと、なんでもOKです😊');

  // ── フォームURL をログに出力 ───────────────────────────
  Logger.log('==============================================');
  Logger.log('✅ フォームの作成が完了しました！');
  Logger.log('----------------------------------------------');
  Logger.log('📋 編集用URL（人事用・共有しないでください）:');
  Logger.log(form.getEditUrl());
  Logger.log('----------------------------------------------');
  Logger.log('🔗 回答用URL（学生に共有するURL）:');
  Logger.log(form.getPublishedUrl());
  Logger.log('==============================================');

  return form.getPublishedUrl();
}
