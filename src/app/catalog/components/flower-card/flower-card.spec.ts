import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { Flower, FlowerCard } from '@catalog';
import { By } from '@angular/platform-browser';

describe('FlowerCard', () => {
  let component: FlowerCard;
  let fixture: ComponentFixture<FlowerCard>;

  const mockFlower: Flower = {
    _id: '1',
    name: 'Rosa Roja',
    price: 15,
    description: 'Rosa hermosa',
    category: 'romántico',
    images: ['https://example.com/rose.jpg'],
    stock: 10,
    size: 'mediano',
    colors: ['rojo'],
    occasion: 'amor',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerCard],
      providers: [
        provideLocationMocks(),
        provideRouter([{ path: 'catalog/:id', component: FlowerCard }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowerCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('flower', mockFlower);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display flower name', () => {
    const nameElement = fixture.debugElement.query(By.css('h3'));
    expect(nameElement.nativeElement.textContent).toContain('Rosa Roja');
  });

  it('should display flower price', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('15');
  });

  it('should display flower image', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.nativeElement.src).toContain('rose.jpg');
    expect(imgElement.nativeElement.alt).toBe('Rosa Roja');
  });

  it('should display category badge', () => {
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    const categoryBadge = badges.find((b) => b.nativeElement.textContent.trim() === 'romántico');
    expect(categoryBadge).toBeTruthy();
  });

  it('should display color badges', () => {
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    const colorBadges = badges.filter((b) => b.nativeElement.textContent.trim() === 'rojo');
    expect(colorBadges.length).toBeGreaterThan(0);
  });
});
